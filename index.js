// ######################################################
// Discord constants
// ######################################################
const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS ] });

require('discord-buttons')(client);
const { MessageButton, MessageActionRow } = require('discord-buttons')


const { token } = require('../token.json');
const { prefix } = require('./config.json');

// ######################################################
// Get my commands
// ######################################################

const fs = require('fs');

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
console.log(`${commandFiles}`)
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    client.command.set(command.name, command);
}

// ######################################################
// Discord calls
// ######################################################

client.once('ready', () =>{
    console.log(`Bot ${client.user.tag} online !!\n\rby using : ${prefix}`);
});

// ######################################################
// Detect Commands
// ######################################################

client.on('messageCreate', message =>{    
    if (!message.content.startsWith(prefix) || message.author.bot) return;


    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    console.log(`Received the command \n\r${command}\n\rwith the arguments\n\r${args}`);

    if (command === "help"){
        client.command.get('help').execute(message, args, Discord);
        message.channel.send("Please, make someone send help !")
    } else if (command === "add"){
        client.command.get('add').execute(message, args, Discord);
    } else if (command === "ping"){
        client.command.get('ping').execute(message, args, Discord);
    }

});

/*
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY'),
            );

        await interaction.reply({ content: 'Pong!', components: [row] });
    }
});*/

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

// ######################################################
// Buttons handling
// ######################################################

client.on('clickButton', async (button) => {
	
	console.log("Clicked");

    switch (button.id)
    {
        case "Test" :
            console.log("Test Button clicked");
            break;
    
        default :
            console.log("Not a registered button : " + interaction.id);
    }
});

















client.login(token);

