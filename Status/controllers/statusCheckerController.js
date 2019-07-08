const Discord = require('discord.js');
const apiServices = require('../services/apiServices');

module.exports = {
    checkAPI() {
        let embed = new Discord.RichEmbed();
        apiServices.API_Status()
        .catch(() => {
            embed.setColor(0x00ff00).addField('API is not responding');
            bot.channels.get('543862697742172179').send(embed);
        });
    },
    checkDBL() {
        let embed = new Discord.RichEmbed();
        apiServices.DBL_Status()
        .catch(() => {
            embed.setColor(0x00ff00).setTitle('DBL Service is not responding');
            bot.channels.get('543862697742172179').send(embed);
        });
    },
    checkDiscord() {
        let embed = new Discord.RichEmbed();
        apiServices.Discord_Status()
        .catch(() => {
            embed.setColor(0x00ff00).addField('Bot is not responding');
            bot.channels.get('543862697742172179').send(embed);
        });
    },
    checkLogger() {
        let embed = new Discord.RichEmbed();
        apiServices.Logger_Status()
        .catch(() => {
            embed.setColor(0x00ff00).addField('Logger Service is not responding');
            bot.channels.get('543862697742172179').send(embed);
        });
    },
    checkTwitchTracker() {
        let embed = new Discord.RichEmbed();
        apiServices.TwitchTracker_Status()
        .catch(() => {
            embed.setColor(0x00ff00).addField('Twitch Tracker Service is not responding');
            bot.channels.get('543862697742172179').send(embed);
        });
    }
};