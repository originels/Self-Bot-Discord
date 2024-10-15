const { readdirSync } = require("fs");
const path = require("path");
const appRoot = require('app-root-path').path;
const { Collection } = require('discord.js-selfbot-v13');
const { logError } = require('../structures/gestion/error.js');
require('colors');

const go = async (client, db, config,) => {

    if (client !== null) {
        console.clear() 
    }  

    client.voiceManager = new Collection();

    client.eventt = new Collection();
    client.cmd = new Collection();
    client.error = new Collection();

    let error = 0;
    let cmd = 0;
    let eventt = 0;

    const eventsDir = path.join(appRoot, 'events');
    readdirSync(eventsDir).forEach(dirs => {
        const events = readdirSync(path.join(eventsDir, dirs)).filter(files => files.endsWith(".js"));
        for (const event of events) {
            const evt = require(path.join(eventsDir, dirs, event));
            const evtName = event.split(".")[0];
    
            if (evt && typeof evt.run === 'function') {
                client.on(evtName, evt.run.bind(null, client, db, config));
                eventt++;
            } else {
                error++;
            }
        }
    });




    try {
        client.prefixCommands = new Collection();

        const prefixCmdsDir = path.join(appRoot, 'command');

        readdirSync(prefixCmdsDir).forEach(async (dir) => {
            const commands = readdirSync(path.join(prefixCmdsDir, dir)).filter(file => file.endsWith('.js'));

            for (const file of commands) {
                const command = require(path.join(prefixCmdsDir, dir, file));

                if (!command.name) {
                    //console.log(`[CMD]`.brightMagenta + ` =>`.grey + ` Chargement impossible {${path.join(prefixCmdsDir, dir, file)}}`.red);
                    await logError(`Failed to load. {${path.join(prefixCmdsDir, dir, file)}}`);
                    error++;
                    continue;
                }

                if (!command.usage) {
                    //console.log(`[CMD]`.brightMagenta + ` =>`.grey + ` Avertissement:`.red +` Option usage non définie pour ${command.name}.`.green);
                    await logError(`Undefined usage option for ${command.name}.`);
                    command.usage = `${command.name}`; 
                    error++;
                }

                client.prefixCommands.set(command.name, command);
                cmd++;

                if (command.aliases && command.aliases.length) {
                    command.aliases.forEach(alias => {
                        client.prefixCommands.set(alias, command);
                    });
                }
            }
        });

    } catch (e) {
        console.log('Erreur lors du chargement des commandes:', e);
        error++;
    }
    client.on('ready', () =>{
        client.error.set(`error`, error);
        client.cmd.set(`cmd`, cmd);
        client.eventt.set(`event`, eventt);
    })
};

module.exports = go;