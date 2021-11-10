/******************************************************************************************************************************
 * 
 * I'd prefer to do this with a MySQL database, but unfortunately redbrick doesn't have the tools installed to do that.
 * And I'm not sure if I want to spend the time to do that / pay for hosting elsewhere so for now this will do.
 * I may edit it to be a google sheet or 'real' database later but for now this will do.
 * 
 ******************************************************************************************************************************/

const fs = require('fs');
const env = require('dotenv').config();

exports.run = async (client, message, args) => {
    // check if verified role exists
    if (!message.guild.roles.cache.find(role => role.name == 'Verified')) {
        message.channel.send('Verified role does not exist. Please create it.');
        return;
    }
    // check channel is the verification channel
    if (message.channel.id == process.env.VERIFICATION_CHANNEL_ID) {
        // make sure they sent args
        if (!args[0]) {
            message.channel.send('Please provide an id to verify.');
            return;
        }
        // check if the user does not have the 'verified' role
        if (message.member.roles.cache.find(role => role.name == 'Verified')) {
            // if so, send an error message
            return message.channel.send(`You are already verified!`);
        }
        // if not, check the id sent by the user and verify them if it exists in student.txt
        else {
            // read the file
            const file = fs.readFileSync('students.txt', 'utf8');
            // split the file into an array
            const array = file.split('\n');
            // check if the id exists in the array
            if (array.includes(args[0])) {
                // if so, add the 'verified' role to the user
                var role = message.guild.roles.cache.find(role => role.name == 'Verified');
                // add role to user
                message.member.roles.add(role);
                // change the verified status in the file
                const newFile = file.replace(args[0] + '\n', args[0] + ' - verified by ' + message.author.id + ' (' + message.author.username + '#' + message.author.discriminator + ')\n');
                // write the new file
                fs.writeFileSync('students.txt', newFile);
                // send a success message
                message.channel.send(`You have been verified!`);
                // delete message
                setTimeout(() => message.delete(), 1000);
            }
            // if not, send an error message
            else {
                return message.channel.send(`That ID does not exist in our database! It may have been taken by another member. If you believe this is the case, please contact a member of staff.`);
            }
        }
    }
    else {
        // if the channel is the verification channel, send an error message
        return message.channel.send(`Please use the verification channel to verify yourself.`);
    }
}

exports.help = {
    name: "verify"
}