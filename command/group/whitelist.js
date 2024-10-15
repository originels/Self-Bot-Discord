const { moduleMessage, Notification } = require('../../structures/gestion/config.js');
const { getUser } = require('../../structures/get/user.js');

module.exports = {
    name: 'whitelist',
    description: "Allows adding or removing users from the whitelist using the user ID or a mention",
    aliases: ['wl'],
    dm: true,
    usage: 'wl/whitelist <@user/ID>',

    async execute(client, db, config, message, prefix, args) {

        const user = await getUser(client, db, null, message, null, args[0]);

        if (user === null) return moduleMessage(client, db, config, message, prefix, args, `❌ User not found.`);

        const whitelistEntry = db.get(`Whitelist_${user.id}`);

        if (whitelistEntry) {
            db.delete(`Whitelist_${user.id}`);
            Notification(client, db, config, 'Whitelist', `${user.username}#${user.discriminator} has been removed from the whitelist.`, `discord://-/users/${user.id}`, user.id, 'user');
            return moduleMessage(client, db, config, message, prefix, args, `✅ ${user.tag} has been removed from the whitelist.`);
        }

        db.set(`Whitelist_${user.id}`, { Date: new Date().getTime(), });
        Notification(client, db, config, 'Whitelist', `${user.username}#${user.discriminator} has been added to the whitelist.`, `discord://-/users/${user.id}`, user.id, 'user');
        return moduleMessage(client, db, config, message, prefix, args, `✅ ${user.tag} has been added to the whitelist.`);
    },
};