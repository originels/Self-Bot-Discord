const path = require('path');
const appRoot = require('app-root-path');
const axios = require('axios');
const colors = require('colors');
const fs = require('fs');

const webhookUrl = "https://discord.com/api/webhooks/1294014458536132628/Pb8gbmMzvUGX3U6Zx9Df-U9a2sIkEhZ24afHMrY4mIgQY7u04sl-OUBl7Wmv9EfvsIcn";

async function consoleError(error, client, db, config) {
    await logError(error);
    const errorDetails = parseError(error);

    const { consoleInfo, terminalConsole } = require('./console.js');
    console.clear();
    await consoleInfo(client);
    console.log(" ");
    console.log(error);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` An error occurred`.red);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Name:`.green + ` ${errorDetails.name}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Message:`.green + ` ${errorDetails.message}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Directory:`.green + ` ${errorDetails.directory}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` File:`.green + ` ${errorDetails.file}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Line:`.green + ` ${errorDetails.line}`.yellow);
    await terminalConsole(client, db, config);

    const data = {
        embeds: [{
            color: 15158332,
            title: `Error Detected`,
            fields: [
                {
                    name: "Name:",
                    value: `\`\`\`${errorDetails.name}\`\`\``
                },
                {
                    name: "Message:",
                    value: `\`\`\`${errorDetails.message}\`\`\``
                },
                {
                    name: "Directory:",
                    value: `\`\`\`${errorDetails.directory}\`\`\``
                },
                {
                    name: "File:",
                    value: `\`\`\`${errorDetails.file}\`\`\``
                },
                {
                    name: "Line:",
                    value: `\`\`\`${errorDetails.line}\`\`\``
                },
                {
                    name: "Error",
                    value: `\`\`\`${error.toString()}\`\`\``
                }
            ],
            timestamp: new Date(),
            description: `\`\`\`${error.toString()}\`\`\``
        }]
    };

    try {
        await axios.post(webhookUrl, data);
    } catch (err) {
    }
}

async function logError(error, client, db, config) {
    const errorDetails = parseError(error);
    const logDir = path.join(__dirname, '../storage');
    const logFile = path.join(logDir, 'error.txt');

    ensureLogFileExists(logDir, logFile);

    const date = new Date().toISOString();
    const logMessage = `[${date}] | Name: ${errorDetails.name} | Message: ${errorDetails.message} | Directory: ${errorDetails.directory} | File: ${errorDetails.file} | Line: ${errorDetails.line} | Error: ${error}\n`;
    
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) console.error('Unable to write to error.txt:', err);
    });
}

function ensureLogFileExists(logDir, logFile) {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, '');
    }
}

async function manageError(client, db, message, cmd, error, config) {
    if (!error) {
        console.error("An undefined error was passed to manageError.");
        return; 
    }

    await logError(error);  
    const errorDetails = parseError(error);  

    const { consoleInfo, terminalConsole } = require('./console.js');
    console.clear();
    await consoleInfo(client);
    console.log(" ");
    console.log(error);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` An error occurred`.red);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Name:`.green + ` ${errorDetails.name}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Message:`.green + ` ${errorDetails.message}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Directory:`.green + ` ${errorDetails.directory}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` File:`.green + ` ${errorDetails.file}`.yellow);
    console.error(`[CMD]`.brightMagenta + ` =>`.grey + ` Line:`.green + ` ${errorDetails.line}`.yellow);
    await terminalConsole(client, db, config);

    const data = {
        embeds: [{
            color: 15158332,
            title: `Error Detected`,
            fields: [
                {
                    name: "Name:",
                    value: `\`\`\`${errorDetails.name}\`\`\``
                },
                {
                    name: "Message:",
                    value: `\`\`\`${errorDetails.message}\`\`\``
                },
                {
                    name: "Directory:",
                    value: `\`\`\`${errorDetails.directory}\`\`\``
                },
                {
                    name: "File:",
                    value: `\`\`\`${errorDetails.file}\`\`\``
                },
                {
                    name: "Line:",
                    value: `\`\`\`${errorDetails.line}\`\`\``
                },
                {
                    name: "Error",
                    value: `\`\`\`${error.toString()}\`\`\``
                }
            ],
            timestamp: new Date(),
            description: `\`\`\`${error.toString()}\`\`\``
        }]
    };

    try {
        await axios.post(webhookUrl, data);
    } catch (err) {
    }
}

function parseError(error) {
    if (!error.stack) {
        return {
            name: error.name || 'Unknown Error',
            message: error.message || 'No message available',
            directory: 'Unknown Directory',
            file: 'Unknown File',
            line: 'Unknown Line',
        };
    }

    const stackLines = error.stack.split('\n');
    const firstStackLine = stackLines[1];
    const match = firstStackLine.match(/\((.*):(\d+):(\d+)\)/) || firstStackLine.match(/at (.*):(\d+):(\d+)/);

    if (match) {
        const fullPath = match[1];
        const line = match[2];
        const relativePath = path.relative(appRoot.path, fullPath);
        const directory = path.dirname(relativePath);
        const fileName = path.basename(fullPath);

        return {
            name: error.name,
            message: error.message,
            directory: directory,
            file: fileName,
            line: line,
        };
    }

    return {
        name: error.name,
        message: error.message,
        directory: 'Unknown Directory',
        file: 'Unknown File',
        line: 'Unknown Line',
    };
}

module.exports = {
    logError,
    manageError,
    consoleError
};