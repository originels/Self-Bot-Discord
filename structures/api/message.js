const axios = require("axios");

let zz = '';

async function Delete(client, db, config, chan_id, message_id, authentification) {
    try {
        const response = await axios.delete(`https://canary.discord.com/api/v9/channels/${chan_id}/messages/${message_id}`, {
            headers: {
                "accept": "*/*",
                "accept-language": "en-GB",
                "authorization": `${authentification}`,
                "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-GB",
                "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJjYW5hcnkiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC41NyIsIm9zX3ZlcnNpb24iOiIxMC4wLjE5MDQ1Iiwib3NfYXJjaCI6Ing2NCIsInN5c3RlbV9sb2NhbGUiOiJlbi1HQiIsImNsaWVudF9idWlsZF9udW1iZXIiOjE3ODYzNCwibmF0aXZlX2J1aWxkX251bWJlciI6MzAyNzAsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGwsImRlc2lnbl9pZCI6MH0="
            }
        });

        if (response.status === 204) {
            return 'true';
        }

        if (response.data.message === "Impossible d'exécuter une action sur un message système") {
            return 'true';
        }

        if (response.data.retry_after) {
            const retry_time = response.data.retry_after * 1000;
            await new Promise(resolve => setTimeout(resolve, retry_time));
            return 'fail';
        }

    } catch (error) { return 'fail' };
}

async function Fetch(client, db, config, channelId) {

    const userId = client.user.id

    try {
        let continueFetching = true;

        while (continueFetching) {
            const response = await axios.get(`https://canary.discord.com/api/v9/channels/${channelId}/messages?${zz}limit=100`, {
                headers: {
                    "accept": "*/*",
                    "accept-language": "en-GB",
                    "authorization": `${config.token}`,
                    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-debug-options": "bugReporterEnabled",
                    "x-discord-locale": "en-GB",
                    "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJjYW5hcnkiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC41NyIsIm9zX3ZlcnNpb24iOiIxMC4wLjE5MDQ1Iiwib3NfYXJjaCI6Ing2NCIsInN5c3RlbV9sb2NhbGUiOiJlbi1HQiIsImNsaWVudF9idWlsZF9udW1iZXIiOjE3ODYzNCwibmF0aXZlX2J1aWxkX251bWJlciI6MzAyNzAsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGwsImRlc2lnbl9pZCI6MH0="
                }
            });

            const jsonMessages = response.data;

            if (jsonMessages.length < 100) {
                continueFetching = false; 
            }

            for (let i = 0; i < jsonMessages.length; i++) {
                if (jsonMessages[i].author.id === userId && (jsonMessages[i].type === 0 || jsonMessages[i].type === 19)) {
                    while (true) {
                        const result = await Delete(client, db, config, channelId, jsonMessages[i].id, config.token);
                        if (result === 'true') break;
                    }
                }

                if (i === jsonMessages.length - 1) {
                    zz = `before=${jsonMessages[i].id}&`; 
                }
            }
        }
    } catch (error) { };
}

module.exports = {
    Delete,
    Fetch,
};
