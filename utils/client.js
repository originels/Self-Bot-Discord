const { Client, Collection } = require('discord.js-selfbot-v13');
const { startConnectingMessage, stopConnectingMessage, consoleInfo, terminalConsole } = require('../structures/gestion/console.js');
class client extends Client {
    constructor() {
        super({
            checkUpdate: false, 
            autoRedeemNitro: false, 
            ws: { 
                properties: { 
                    os: 'Linux', 
                    browser: 'Discord Client', 
                    release_channel: 'stable', 
                    client_version: '1.0.9011', 
                    os_version: '10.0.22621', 
                    os_arch: 'x64', 
                    system_locale: 'en-US', 
                    client_build_number: 175517, 
                    native_build_number: 29584, 
                    client_event_source: null, 
                    design_id: 0, 
                }
            }
        });
        this.config = require("./config.json");
        this.autoReconnect = true;
        this.cmds = new Collection();
    }

    async go() {
        process.stdout.write('\x1b]0;UwUhq session\x07');
        startConnectingMessage(); 
        setTimeout(async () => {
            try {
                await this.login(this.config.token);
                stopConnectingMessage();
            } catch (error) {
                stopConnectingMessage();
                await consoleInfo(null);
                console.log("")
                console.log(`[CMD]`.brightMagenta + ` =>`.grey + ` Invalid or expired token.`.red);
                await terminalConsole(null, null, this.config);   
            } 
        }, 5000);
    }    
}

module.exports = client;