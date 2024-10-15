const DataBase = require("./database/src/index.js");
const db = new DataBase("./database/data/data.sqlite");

const Client = require("./utils/client.js");
const client = new Client();

const handler = require("./utils/handler.js");
const config = require("./utils/config.json");

const { logError, consoleError } = require('./structures/management/error.js');
handler(client, db, config).then(() => client.go());

process.on("unhandledRejection", err => {

    logError(err, client, db, config)
    consoleError(err, client, db, config);
    if (err.message) return;
});
process.on('uncaughtExceptionMonitor', err => {

    logError(err, client, db, config)
    consoleError(err, client, db, config);
    if (err.message) return;
});
process.on("unhandledRejection", err => {

    logError(err, client, db, config)
    consoleError(err, client, db, config);
    if (err.message) return;
});
