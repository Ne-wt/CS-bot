const helpers = require("./helpers.js"); 

module.exports = {
    help: function (client, message) {
        var embedMessage = helpers.embed(client, "```Here's a list of all commands:\n• !help - That's this message :)\n• !ping - Pong!\n ```");
        message.channel.send({ embeds: [embedMessage] });
    }
};