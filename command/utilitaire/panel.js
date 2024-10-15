const { moduleMessage } = require('../../structures/management/config.js');

module.exports = {
    name: 'panel',
    description: "Allows the creation of a private group channel. It enables interaction exclusively with the UwUhq.",
    aliases: [],
    dm: true,
    usage: 'panel',

    async execute(client, db, config, message, prefix, args) {

        const userId = message.author.id;

        client.channels.createGroupDM([userId, userId]).then(grp => {
            grp.setName("Panel UwUhq");
            setTimeout(() => {
                grp.send(`<@${message.author.id}> Welcome to the panel **UwUhq**\n\n> This panel is created when **UwUhq** connects, exclusively for you to use with **UwUhq** (Prefix : \`${prefix}\`).\n-# We recommend avoiding public commands, as other users might report you.\n-# Although we have an automatic deletion system, this may lead to complications. [Terms of Service](https://discord.com/terms).`).then(message => {
                    message.react("💎");
                    message.pin()
                });
                moduleMessage(client, db, config, message, prefix, args, `Your private UwUhq channel has been created.`);
            }, 500);
        })
    },
};
