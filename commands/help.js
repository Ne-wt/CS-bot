const helpers = require("../helpers/helpers.js");

exports.run = async (client, message, args) => {
    var embedMessage = helpers.embed(client, "```Here's a list of all commands:\n• !help - That's this message :)\n• !ping - Pong!\n• !verify [ID] - Verifies you are a first year!```");
    message.channel.send({ embeds: [embedMessage] });
}

exports.help = {
    name: "help"
}