const { Notification } = require('../../structures/management/config.js');
const { logError } = require('../../structures/management/error.js');

module.exports = {
    name: 'channelCreate',
    async run(client, db, config, channel) {

        if (channel.type === "GROUP_DM") {
            const owner = channel._recipients.find(user => user.id === channel.ownerId);
            const data = db.get(`Module_${client.user.id}`); 
            if (!owner) return;
            if (client.user.id === owner.id) return;
            if (!data.antigroup.state) return;
            if (db.get(`Whitelist_${owner.id}`)) return;

            Notification(client, db, config, 'Group', `The owner of the group, ${owner.username}#${owner.discriminator}, is not on the whitelist. The group has been left.`, `discord://-/users/${owner.id}`, owner.id, 'user');
            if (data.antigroup.message) {
                await channel.send(`The owner of the group, ${owner.username}#${owner.discriminator}, is not on the whitelist. You are not allowed to add me.`);
            }
            await channel.delete().catch(async (err) => await logError(`'Error while loading commands: ${err}`));
        }
    }
};