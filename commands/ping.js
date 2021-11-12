exports.run = async (client, message, args) => {
    message.reply(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms.`);
}

exports.help = {
    name: "ping",
    description: "Pong!",
}