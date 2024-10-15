const axios = require("axios");

async function get(client, db, config) {
    try {
        const response = await axios.get("https://discord.com/api/v9/auth/sessions", {
            headers: {
                "Authorization": config.token,
                "x-super-properties": "ewogICJvcyI6ICJXaW5kb3dzIiwKICAiY2xpZW50X2J1aWxkX251bWJlciI6IDE1MjQ1MAp9"
            }
        });

        const userSessions = response.data.user_sessions || []; 

        const mobilePlatforms = ['iOS', 'Android', 'Mobile Safari', 'Chrome iOS']; 
        const desktopPlatforms = ['Windows', 'MacOS', 'Linux', 'Discord Client']; 
        const webPlatforms = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Mobile Safari', 'Chrome iOS']; 

        const recentMobileSession = userSessions
            .filter(session => mobilePlatforms.includes(session.client_info.platform))
            .sort((a, b) => new Date(b.approx_last_used_time) - new Date(a.approx_last_used_time))[0];

        const recentDesktopSession = userSessions
            .filter(session => desktopPlatforms.includes(session.client_info.platform))
            .sort((a, b) => new Date(b.approx_last_used_time) - new Date(a.approx_last_used_time))[0];

        const recentWebSession = userSessions
            .filter(session => webPlatforms.includes(session.client_info.platform))
            .sort((a, b) => new Date(b.approx_last_used_time) - new Date(a.approx_last_used_time))[0]; 

        return {
            recentMobileSession,
            recentDesktopSession,
            recentWebSession
        }; 
    } catch (error) {
        return null;
    }
}

module.exports = {
    get,
};