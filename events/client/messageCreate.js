const { moduleMessage } = require('../../structures/management/config.js');
const { logError, manageError } = require('../../structures/management/error.js');

module.exports = {
    name: 'messageCreate',
    async run(client, db, config, message) {
        if (message.author.id !== client.user.id) return;

        const prefix = db.get(`Prefix_${client.user.id}`) || config.prefix;

        if (!message.content.startsWith(prefix)) return; 
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const cmd = client.prefixCommands.get(commandName);
        if (!cmd) return;

        if (message.channel.type === 'DM' && !cmd.dm) return;

        try {
            await cmd.execute(client, db, config, message, prefix, args);
        } catch (error) {
            await manageError(client, db, message, message, cmd, error, config);
            await logError(error, client, db, config)
            return moduleMessage(client, db, config, message, prefix, args, `❌ An error has occurred.`);
        }
    }
};
