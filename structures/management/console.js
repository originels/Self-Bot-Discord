const readline = require('readline');
const Table = require('cli-table3');
const colors = require('colors'); 
const packageJson = require('../../package.json');

async function consoleInfo(client) {
    let username = 'null'.yellow; 
    if (client !== null) {
        const user = await client.users.fetch(client.user.id).catch(() => null);
        username = user ? `${user.username}`.green : username; 
    }

    const table = new Table({
        chars: {
            'top': '─',
            'top-mid': '┬',
            'top-left': '┌',
            'top-right': '┐',
            'bottom': '─',
            'bottom-mid': '┴',
            'bottom-left': '└',
            'bottom-right': '┘',
            'left': '│',
            'left-mid': '',
            'mid': '',
            'mid-mid': '',
            'right': '│',
            'right-mid': '',
            'middle': ' '
        },
        style: { 'padding-left': 1, 'padding-right': 1 },
        colWidths: [70]
    });

    const error = client === null ? 'null'.yellow : client.error.get(`error`) <= 0 ? `${client.error.get(`error`)}`.green : `${client.error.get(`error`)}`.red
    const command = client === null ? 'null'.yellow : `${client.cmd.get('cmd')}`.green;
    const event = client === null ? 'null'.yellow : `${client.eventt.get('event')}`.green;

    table.push(
        ['                 • UwUhq Edition ' + `${packageJson.version}`.magenta + ' •        '],
        ['                (SB session client tools)      '],
        ['                                                             '],
        [' > Self-Bot session to ' + username + `@`.grey + `uwuhq`.magenta + ` `.grey],
        ['   - Command : ' + command + '                                              '],
        ['   - Event   : ' + event + '                                              '],
        ['   - Error   : ' + error + '                                              '],
        ['                                                             '],
        [' > For more information, type ' + 'help'.brightCyan + ' or visit ' + 'github'.brightCyan + '.     ']
    );

    console.clear()
    console.log(table.toString());
}

async function terminalConsole(client, db, config) {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const user = client === null ? `` : await client.users.fetch(client.user.id).catch(() => null);
    const username = client === null ? `null`.yellow : `${user.username}`.green

    const prompt = () => {
        console.log(" ");
        rl.question(
            `${username}`.green + `@`.grey + `uwuhq`.magenta + `:~$ `.grey, handleInput
        );
    };

    const handleInput = async (input) => {
        const args = input.trim().split(' ');
        const command = args[0].toLowerCase();
        
        try {
            const commandFile = require(`../commands/${command}`);
            await commandFile.run(client, db, config, args);
        } catch (err) {
            console.log(colors.red(`Command not found: ${command}`));
        }

        prompt();
    };

    prompt();
}

let dotCount = 0;
let intervalId = null;

const updateMessage = () => {
    console.clear(); 
    const dots = '.'.repeat(dotCount);
    console.log(`Connection attempt with the access key${dots}`.blue);
    dotCount = (dotCount + 1) % 4; 
};

const startConnectingMessage = () => {
    intervalId = setInterval(updateMessage, 500); 
    setTimeout(stopConnectingMessage, 5000); 
};

const stopConnectingMessage = () => {
    clearInterval(intervalId); 
    console.clear();
}

module.exports = {
    startConnectingMessage,
    stopConnectingMessage,
    consoleInfo,
    terminalConsole
};
