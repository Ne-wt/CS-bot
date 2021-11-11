exports.run = async (client, message, args) => {
    // check if author is an admin
    if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        message.channel.send(`
        Welcome!
        The following is a brief list of rules. Please note this list is not exhaustive, and moderators can add or remove rules as they see fit.

        **Rules**
        • Don't break Discord TOS.
        • Don't provoke others or create a toxic environment. This includes being unnecessarily rude, harassing others, or causing others to feel uncomfortable.
        • No NSFW/NSFL or similar inappropriate content.
        • No endorsement/partaking in plagiarism.
        • No politics or similar discussion irrelevant to server themes.
        • Do not advertise. Stream plugs and/or original content are the only exceptions.
        • Try to keep channels on-topic.

        The server operates on a '3 strikes and you're out' system. If you break a rule for the third time, you will be banned from the server.

        - Adam Sandler
        `);
    }
}

exports.help = {
    name: "rules"
}