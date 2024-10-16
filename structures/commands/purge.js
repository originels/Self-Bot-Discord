const { Notification } = require('../management/config.js');
const { Fetch } = require('../api/message.js');
const colors = require('colors');

module.exports.run = async (client, db, config, args) => {
    if (client === null) {
        console.log(colors.red("You cannot execute this command because it requires access to an account."));
        return;
    }

    const channel = await client.channels.fetch(args[1]).catch(() => null);
    if (channel === null) {
        console.log(colors.red(`Channel not found: ${args[1]}`));
        return;
    }

    await Fetch(client, db, config, channel.id)

    if (channel.type === 'DM') {
        console.log(`All messages in ${channel.user.username} have been deleted.`);
        Notification(client, db, config, 'Purge', `All messages in ${channel.user.username}#${channel.user.discriminator} have been deleted.`, `discord://-/users/${channel.user.id}`, channel.user.id, 'user');
    } else if (channel.type === 'GROUP_DM') {
        console.log(`All messages in group have been deleted.`);
        Notification(client, db, config, 'Purge', `All messages in group have been deleted.`, `discord://-/channels/${channel.id}`, channel.id, 'guild');
    } else {
        console.log(`All messages in ${channel.name} have been deleted.`);
        Notification(client, db, config, 'Purge', `All messages in ${channel.name} have been deleted.`, `discord://-/channels/${channel.guild.id}/${channel.id}`, channel.guild.id, 'guild');
    }
};