
// ######################################################
// Discord constants
// ######################################################
const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS ] });

/*require('discord-buttons')(client);
const { MessageButton, MessageActionRow } = require('discord-buttons')*/

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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// ######################################################
// Detect Commands
// ######################################################


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(token);
