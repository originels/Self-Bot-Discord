const { moduleMessage } = require('../../structures/management/config.js');

module.exports = {
    name: 'antigroup',
    description: "Allows managing the antigroup module.",
    aliases: [],
    dm: true,
    usage: 'antigroup [message]',

    async execute(client, db, config, message, prefix, args) {
        const data = await db.get(`Module_${client.user.id}`) || { antigroup: {} };
        const type = args[0]?.toLowerCase();

        const toggleSetting = (key, responseMessage) => {
            data.antigroup[key] = !data.antigroup[key];
            db.set(`Module_${client.user.id}`, data);
            moduleMessage(client, db, config, message, prefix, args, `✅ ${responseMessage} ${data.antigroup[key] ? 'enabled' : 'disabled'}.`);
        };

        if (type === 'message' || type === 'msg') {
            toggleSetting('message', 'The message sending before leaving has been');
        } else {
            toggleSetting('state', 'The module has been');
        }
    },
};
