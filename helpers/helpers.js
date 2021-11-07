const { MessageEmbed } = require('discord.js');

module.exports = {
    embed: function(client, content) {
        var embedMessage = new MessageEmbed()
            .setColor('#43b9f0')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription(content)
            .setTimestamp()
            .setFooter('CS Bot', client.user.avatarURL);
        return embedMessage
    }
};