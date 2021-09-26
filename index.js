const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });


const { token } = require('../token.json');
const { prefix } = require('./config.json');

client.once('ready', () =>{
    console.log('Bot online !!')
});


client.login(token);

/*
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('../token.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);   */