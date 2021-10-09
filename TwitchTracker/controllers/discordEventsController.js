const config = require('../config/config');
const Discord = require('discord.js');
const chalk = require('chalk');
const tokenController = require('../controllers/tokenController');
const twitchTrackerController = require('../controllers/twitchTrackerController');
const services = {};

async function getDate() {
    let date = new Date();
    let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return `${date.toLocaleString('en-US', options)} EST`;
}

services.handleOnReady = async (bot) => {

    if(!config.accessTokens.twitch) tokenController.getToken(handleTrackers);
    else handleTrackers();
    

    // DEFAULT INTERVAL: 120000
    async function handleTrackers() {
        setInterval(() => twitchTrackerController.run(bot), 120000);
    };
    
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff9900')('[LOG]') + ' Twitch-Tracker Ready');

    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff9900).setTitle("Twitch Tracker Starting up...").setFooter(await getDate());
    bot.channels.resolve("543862697742172179").send(embed);
};

services.handleOnError = async (bot, err) => {
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff0000')('[ERROR]') + ' CLIENT ERROR', err);

    let embed = new Discord.MessageEmbed();
    embed.setColor(0xff0000).setTitle("**[CLIENT ERROR]**: Twitch Tracker").setFooter(await getDate());

    bot.channels.resolve("543862697742172179").send(embed);
};

module.exports = services;