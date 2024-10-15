const { exec } = require('child_process');

module.exports.run = async (client, db, config, args) => {
    const url = "https://github.com/UwUhq";
    exec(`start ${url}`, (err) => {});
    console.log(`Opening the GitHub profile.`);
};
