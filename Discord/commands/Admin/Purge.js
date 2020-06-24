const Discord = require('discord.js');
const logSettings = require('../../models/GuildModels/guildLogSettingsDB');
const utils = require('../utils/utils');
const errorHandler = require('../../controllers/errorHandler');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function checkLogSettings(bot, message, msg) {
    logSettings.findByGuildId(message.guild.id)
    .then(settings => sendEmbed(bot, message, msg, settings))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            sendEmbed(bot, message, msg);
        else errorHandler(bot, message, err, "Error Finding Log Settings", "Purge")
    });
};

async function sendEmbed(bot, message, msg, settings) {
    let embed = new Discord.MessageEmbed();
    embed
    .setColor(0xff0000)
    .addField('Bulk Message Delete', `**Amount**: ${msg.size}`)
    .setFooter(`Used by: ${message.author.username} on ${await utils.getDate()}`, message.author.avatarURL({ dynamic: true }))

    if(settings) return bot.channels.resolve(settings.channel_id).send(embed);
    else message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {    
    let userId = null;
    let messagecount = 10;
    if(/<@!?(\d+)>/.exec(args.join(" "))) userId = /<@!?(\d+)>/.exec(args.join(" "))[1];
    if(!userId && Number.isInteger(parseInt(args[1], 10))) messagecount = parseInt(args[1], 10);
    if(Number.isInteger(parseInt(args[2], 10))) messagecount = parseInt(args[2], 10);

    if(messagecount > 100)return message.channel.send("You can only delete 100 messages at a time");

    
    
    message.channel.messages.fetch({ limit: messagecount })
    .then(messages => {
        let deleteMessages = messages;
        if(userId) deleteMessages = messages.array().filter(el => el.author.id === userId);

        message.channel.bulkDelete(deleteMessages).then(msg => checkLogSettings(bot, message, msg))
        .catch(err => {
            if(err.code === 50034)
                return message.channel.send('You can only bulk delete messages that are under 14 days old')
        });
    });
};

module.exports.config = {
    name: "purge",
    d_name: "Purge",
    aliases: [],
    params: {required: false, params: '@Tag / Amount'},
    category: "Admin",
    desc: "Bulk delete messages",
    example: "purge @RevenantEverest 20"
};