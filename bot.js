// INITIALISE //
// DISCORD ZONE //
const { Client, Collection, Intents } = require('discord.js');
// intents area
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
    ]
});

client.commands = new Collection();

////////////////////////////////////////

const env = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const helpers = require("./helpers/helpers.js");
const mysql = require('mysql');

////////////////////////////////////////

// FUNCTIONAL ZONE //
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// INNIT DB CONNECTION //
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if(err) throw err;
    console.log('Connected to database!');
});
////////////////////////////////////////

// fetch commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    // get name by removing extension
    let commandName = file.split(".")[0];
	client.commands.set(commandName, command);
}

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

    const command = client.commands.get(primaryCommand);

	if (!command) { 
        message.channel.send(`Sorry, I don't understand that command. Try using \`${process.env.prefix}help\` !`);
        return;
    }

	try {
	    // execute command
        command.run(client, message, args);
	} catch (error) {
		console.error(error);
		message.channel.send("Sorry, something went wrong.");
	}
}

// CLIENT STARTUP //
client.login(process.env.DISCORD_TOKEN);