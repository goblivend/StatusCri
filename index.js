const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS] });


const { token } = require('../token.json');
const { prefix } = require('./config.json');


const fs = require('fs');

client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
console.log(`${commandFiles}`)
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    client.command.set(command.name, command);
}


client.once('ready', () =>{
    console.log(`Bot ${client.user.tag} online !!\n\rby using : ${prefix}`);
});


client.on('messageCreate', message =>{    
    if (!message.content.startsWith(prefix) || message.author.bot) return;


    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    console.log(`Received the command \n\r${command}`);

    if (command === "help"){
        client.command.get('help').execute(message, args, Discord);
        message.channel.send("Please, make someone send help !")
    } else if (command === "add"){
        client.command.get('add').execute(message, args, Discord);
    } else if (command === "ping"){
        client.command.get('ping').execute(message, args, Discord);
    }





})

















client.login(token);

