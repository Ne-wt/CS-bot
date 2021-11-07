// INITIALISE //
// DISCORD ZONE //
const { Client, Intents } = require('discord.js');

// intents area
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
    ]
});

////////////////////////////////////////

const env = require('dotenv').config();
const fs = require('fs');
const helpers = require("./helpers/helpers.js");
const commands = require("./helpers/commands.js");

////////////////////////////////////////

// FUNCTIONAL ZONE //
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// check if message is sent
client.on("messageCreate", (message) => {
    if(message.author.bot) return;

    if(message.content.startsWith(process.env.PREFIX)) {
        processCommand(message);
    }
});
        
function processCommand(message) {
    let fullCommand = message.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let args = splitCommand.slice(1);

    switch(primaryCommand) {
        case "ping":
            message.channel.send("Pong!");
            break;
        case "help":
            commands.help(client, message);
            break;
        default:
            message.channel.send("Sorry, I don't understand the command. Try `!help`");
    }
}

// CLIENT STARTUP //
client.login(process.env.DISCORD_TOKEN);