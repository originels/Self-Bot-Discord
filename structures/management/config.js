const notifier = require('node-notifier');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

async function loadConfig(client, db) {
    const defaultSettings = {
        Style: 'block-normal',
        Action: 'edit',
    };

    await Promise.all(
        Object.entries(defaultSettings).map(async ([key, value]) => {
            if (!db.get(`${key}_${client.user.id}`)) {
                await db.set(`${key}_${client.user.id}`, value);
            }
        })
    );

    const defaultData = {
        antigroup: {
            state: false,
            message: false,
        },
    };

    const data = await db.get(`Module_${client.user.id}`);
    if (!data) {
        await db.set(`Module_${client.user.id}`, defaultData);
        return defaultData;
    }
    return data;
}

async function styleMessage(client, db, msg) {
    const styles = {
        'block-crossed': `\`\`\`ini\n${msg}\n\`\`\``,
        'block-normal': `\`${msg}\``,
        'normal': msg,
    };
    return styles[db.get(`Style_${client.user.id}`)] || msg;
}

async function moduleMessage(client, db, config, message, prefix, args, msg) {
    const module = db.get(`Action_${client.user.id}`);
    const styledMessage = await styleMessage(client, db, msg);

    try {
        if (module === 'edit') {
            await message.edit(styledMessage).then(msg => { setTimeout(() => {  msg.delete().catch(() => {}) }, 10000) })
        } else if (module === 'delete') {
            await message.delete();
            await message.channel.send(styledMessage).then(msg => { setTimeout(() => {  msg.delete().catch(() => {}) }, 10000) })
        }
    } catch (error) {
        console.error("Error handling message:", error);
    }
}

async function Notification(client, db, config, title, msg, link, ID, type) {
    let iconPath;

    try {
        if (type === 'user') {
            const user = await client.users.fetch(ID);
            const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true });
            iconPath = await downloadAvatar(avatarURL);
        }
    } catch (error) {
    }

    sendNotification(title, msg, iconPath, link);
}

async function downloadAvatar(avatarURL) {
    const localAvatarPath = path.join(__dirname, '../storage/avatar.png');
    const avatarDir = path.dirname(localAvatarPath);

    if (!fs.existsSync(avatarDir)) {
        fs.mkdirSync(avatarDir, { recursive: true });
    }

    try {
        const response = await axios.get(avatarURL, { responseType: 'stream' });
        const writer = fs.createWriteStream(localAvatarPath);

        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(localAvatarPath));
            writer.on('error', reject);
        });
    } catch (error) {
        return path.join(__dirname, '../storage/fallback_icon.png');
    }
}

function sendNotification(title, msg, iconPath, link) {

    notifier.notify({
        title,
        message: msg,
        icon: iconPath,
        sound: true,
        wait: true,
        appID: 'UwUhq',
        timeout: 10,
        open: link,
    });
}

module.exports = {
    loadConfig,
    styleMessage,
    moduleMessage,
    Notification,
};
