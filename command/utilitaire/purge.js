const { Notification } = require('../../structures/management/config.js');
const { Fetch } = require('../../structures/api/message.js');

module.exports = {
    name: 'purge',
    description: "Delete all messages in a selected channel.",
    aliases: [],
    dm: true,
    usage: 'purge',

    async execute(client, db, config, message, prefix, args) {

        await Fetch(client, db, config, message.channel.id)

        const channel = await client.channels.fetch(message.channel.id).catch(() => null);

        if (channel.type === 'DM') {
            Notification(client, db, config, 'Purge', `All messages in ${channel.user.username}#${channel.user.discriminator} have been deleted.`, `discord://-/users/${channel.user.id}`, channel.user.id, 'user');
        } else if (channel.type === 'GROUP_DM') {
            Notification(client, db, config, 'Purge', `All messages in group have been deleted.`, `discord://-/channels/${channel.id}`, channel.id, 'guild');
        } else {
            Notification(client, db, config, 'Purge', `All messages in ${channel.name} have been deleted.`, `discord://-/channels/${channel.guild.id}/${channel.id}`, channel.guild.id, 'guild');
        }
    },
};
