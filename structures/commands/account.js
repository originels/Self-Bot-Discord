const colors = require('colors');

module.exports.run = async (client, db, config, args) => {
    if (client === null) {
        console.log(colors.red("You cannot execute this command because it requires access to an account."));
        return;
    }

    const userClient = await client.users.fetch(client.user.id).catch(() => null);
    const IsOwner = client.guilds.cache.filter(guild => guild.ownerId === client.user.id);
    const IsAdmin = client.guilds.cache.filter(guild => guild.members.me.permissions.has("ADMINISTRATOR"));

    console.log('>'.grey + ` Number of server${client.guilds.cache.size <= 1 ? "" : "s"}:` + ` ${client.guilds.cache.size}`.green);
    console.log('>'.grey + ` Owner of server${IsOwner.size <= 1 ? "" : "s"}:` + ` ${IsOwner.size}`.green);
    console.log('>'.grey + ` Administrator of server${IsAdmin.size <= 1 ? "" : "s"}:` + ` ${IsAdmin.size}`.green);
    console.log('>'.grey + ` Phone Number:` + (userClient.phone ? ` ${userClient.phone}`.green : " Not provided".red));
    console.log('>'.grey + ` Two-Factor Authentication (2FA):` + (userClient.mfaEnabled ? " Enabled".green : " Disabled".red));
    console.log('>'.grey + ` Email Address:` + (userClient.email ? ` ${userClient.email}`.green : " Not provided".red));
    console.log('>'.grey + ` ID:` + ` ${userClient.id}`.green);
    console.log('>'.grey + ` Username:` + ` ${userClient.username}#${userClient.discriminator}`.green);
};