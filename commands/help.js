const helpers = require("../helpers/helpers.js");
exports.run = async (client, message, args) => {
    a = [];
    client.commands.forEach(command => {
        // get the command name
        let name = command.help.name;
        let description = command.help.description;
        // add the command name and description to the array
        a.push(`**${name}** - ${description}`);
    });
    var embedMessage = helpers.embed(client, `
    Here's a list of all commands:\n\n${a.join("\n")}
    `);
    message.channel.send({ embeds: [embedMessage] });
}

exports.help = {
    name: "help",
    description: "Lists all commands.",
}