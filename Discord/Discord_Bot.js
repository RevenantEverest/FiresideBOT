const config = require('./config/config');
const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const Discord_Bot = new Discord.Client();

const readmeController = require('./controllers/readmeController');

// Function can't be moved from this file
async function getCommands() {
    Discord_Bot.commands = new Discord.Collection();
    Discord_Bot.aliases = new Discord.Collection();
    Discord_Bot.config = new Discord.Collection();

    /*
        Pulls all files from the command directory
        For each file sets the name in the config from that file as an element in Discord.Collection
        For each file config, takes the aliases in the config and stores them in Discord.Collection
    */
    config.commands = [];
    config.categories.forEach((el, idx) => {
        let path = `/commands/${el.name}`;
        fs.readdir(`.${path}`, (err, files) => {
            if(err) console.error(err);
            let jsfile = files.filter(f => f.split(".").pop() === 'js');
            if(jsfile.length <= 0) 
                return console.error(chalk.hex('#ff9900')("[LOG]") + " Couldn't find Commands");
            
            jsfile.forEach((file, idx) => {
                let pull = require(`.${path}/${file}`);
                Discord_Bot.commands.set(pull.config.name, pull);
                config.commands.push(pull.config);

                pull.config.aliases.forEach(alias => Discord_Bot.aliases.set(alias, pull.config.name))
            });
        });
    });

    console.log(chalk.hex('#ff9900')("[LOG]") + " Commands Set");
    readmeController.write();
};

Discord_Bot.on("ready", () => require('./controllers/DiscordEvents/onReady')(Discord_Bot, getCommands));
Discord_Bot.on("message", (message) => require('./controllers/DiscordEvents/onMessage')(Discord_Bot, message));
Discord_Bot.on("error", (err) => require('./controllers/DiscordEvents/onError')(Discord_Bot, err));

module.exports = Discord_Bot;
