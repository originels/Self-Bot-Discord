async function getUser(client, db, interaction, message, member, args) {

    let user;

    if (message.mentions.users.size) { 
        user = message.mentions.users.first(); 
    } else if (args) { 
        user = client.users.fetch(args).catch(() => null);
    } else if (message.reference) {
        const referencedMessage = await message.channel.messages.fetch(message.reference.messageId); 
        user = referencedMessage.author;
    } else {
        user = null
    }
    return user
}

module.exports = {
    getUser,
};
