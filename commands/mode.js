const env = require('dotenv').config();

exports.run = async (client, message, args) => {
    message.reply(`Currently in: ${process.env.MODE} mode.`);
}

exports.help = {
    name: "mode",
    description: "Displays if bot is in local or prod mode.",
}