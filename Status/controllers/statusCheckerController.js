const Discord = require('discord.js');
const apiServices = require('../services/apiServices');
const shell = require('shelljs');

let calls = 0;

async function getDate() {
    let date = new Date();
    let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return `${date.toLocaleString('en-US', options)} EST`;
};

async function sendEmbed(bot, message) {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).addField(message, await getDate());
    bot.channels.get('543862697742172179').send(embed);
    calls++;

    if(calls > 1) return;

    shell.exec('~/FiresideBOT/run.sh');
    setTimeout(() => calls = 0, 5000);
};

module.exports = {
    checkAPI(bot) {
        apiServices.API_Status()
        .catch(() => sendEmbed(bot, "API is not responding..."));
    },
    checkDBL(bot) {
        apiServices.DBL_Status()
        .catch(() => sendEmbed(bot, "DBL is not responding..."));
    },
    checkDiscord(bot) {
        apiServices.Discord_Status()
        .catch(() => sendEmbed(bot, "Discord is not responding..."));
    },
    checkLogger(bot) {
        apiServices.Logger_Status()
        .catch(() => sendEmbed(bot, "Logger is not responding..."));
    },
    checkTwitchTracker(bot) {
        apiServices.TwitchTracker_Status()
        .catch(() => sendEmbed(bot, "TwitchTracker is not responding..."));
    }
};