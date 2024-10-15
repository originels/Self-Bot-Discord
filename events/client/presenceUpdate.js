const { Notification } = require('../../structures/management/config.js');
const { get } = require('../../structures/api/session.js');

module.exports = {
    name: 'presenceUpdate',
    async run(client, db, config, oldPresence, newPresence) {
        if (newPresence.userId !== client.user.id) return;

        const user = client.user;
        const clientStatusOld = oldPresence?.clientStatus || {}; 
        const clientStatusNew = newPresence.clientStatus || {}; 

        const platformMap = {
            desktop: { name: 'Desktop (PC)' },
            mobile: { name: 'Mobile' },
            web: { name: 'Web' },
        };

        const statusChanges = Object.keys(platformMap).filter(platform => 
            clientStatusOld[platform] !== clientStatusNew[platform]
        );

        if (statusChanges.length === 0) {
            const sessionInfo = await get(client, db, config);
            const recentSessions = sessionInfo.recentSessions || []; 

            const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
            const recentSession = recentSessions.find(session => 
                new Date(session.approx_last_used_time).getTime() > fiveMinutesAgo
            );

            if (!recentSession) return;

            const { client_info: { os, platform, location } } = recentSession;

            Notification(
                client,
                db,
                config,
                'Session detected',
                `Session info:\nPlatform: ${os} (${platform})\nLocation: ${location}`,
                `discord://-/users/${user.id}`,
                user.id,
                'user'
            );

            return; 
        }

        const platformChanged = statusChanges[0]; 
        if (!platformChanged) return; 

        const sessionInfo = await get(client, db, config);
        const recentSession = sessionInfo[`recent${platformChanged.charAt(0).toUpperCase() + platformChanged.slice(1)}Session`];
        
        if (!recentSession) return;

        const { client_info: { os, platform, location } } = recentSession;

        Notification(
            client,
            db,
            config,
            'Session detected',
            `Session info:\nPlatform: ${os} (${platform})\nLocation: ${location}`,
            `discord://-/users/${user.id}`,
            user.id,
            'user'
        );
    }
};
