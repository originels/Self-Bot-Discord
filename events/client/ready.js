const { loadConfig, Notification } = require('../../structures/management/config.js');
const { terminalConsole, consoleInfo } = require('../../structures/management/console.js');

module.exports = {
    name: 'ready',
    async run(client, db, config) {
        await loadConfig(client, db);
        await consoleInfo(client)
        await terminalConsole(client, db, config)
        const user = await client.users.fetch(client.user.id);
        Notification(client, db, config, 'Connected', `${user.username}#${user.discriminator} is connected to the server.`, `discord://-/users/${user.id}`, user.id, 'user');
    }
};