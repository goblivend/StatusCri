
// >>>>>>>> Begin const discord >>>>>>>>

const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS] });

const { token } = require('../token.json');


const fs = require('fs');
const { fileURLToPath } = require('url');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// <<<<<<<<< End const discord <<<<<<<<<



// >>>>>>>> Begin Discord Calls >>>>>>>>

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} online !!\n\r`);


    const guildId = '691031398768705697';
    const guild = client.guilds.cache.get(guildId);
    let commands

    if (guild) {
        console.log("Guild found");
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong'
    });

    console.log(`commands loaded`);
});


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;

    const { commandName, options } = interaction;

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        if (command.name === commandName) {
            try {
                await command.execute(interaction, options, Discord);
            } catch (error) {
                console.error(error);
            }
        }
    }
})

// <<<<<<<<< End Discord Calls <<<<<<<<<

client.login(token);

