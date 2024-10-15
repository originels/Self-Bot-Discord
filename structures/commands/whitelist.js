const colors = require('colors');
const { Notification } = require('../management/config.js');

module.exports.run = async (client, db, config, args) => {
    if (client === null) {
        console.log(colors.red("You cannot execute this command because it requires access to an account."));
        return;
    }

    const user = await client.users.fetch(args[1]).catch(() => null);
    if (user === null) {
        console.log(colors.red(`User not found: ${args[1]}`));
        return;
    }

    const whitelistEntry = db.get(`Whitelist_${user.id}`);
    if (whitelistEntry) {
        db.delete(`Whitelist_${user.id}`);
        Notification(client, db, config, 'Whitelist', `${user.username}#${user.discriminator} has been removed from the whitelist.`, `discord://-/users/${user.id}`, user.id, 'user');
        console.log(`${user.tag} has been removed from the whitelist.`);
    } else {
        db.set(`Whitelist_${user.id}`, { Date: new Date().getTime() });
        Notification(client, db, config, 'Whitelist', `${user.username}#${user.discriminator} has been added to the whitelist.`, `discord://-/users/${user.id}`, user.id, 'user');
        console.log(`${user.tag} has been added to the whitelist.`);
    }
};
