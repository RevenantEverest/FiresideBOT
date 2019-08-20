const Discord = require('discord.js');
const db = require('../../models/welcomeMessageDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    db.findByGuildId(message.guild.id)
    .then(welcomeMessage => message.author.send(welcomeMessage.message))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No welcome message found");
        else errorHandler(bot, message, err, "DB Error", "ViewWelcomeMessage");
    })
};

module.exports.config = {
    name: 'viewwelcomemessage',
    d_name: 'ViewWelcomeMessage',
    aliases: ['vwm'],
    category: 'Admin',
    desc: `Get sent an example of your server's welcome message in a DM`,
    example: 'viewwelcomemessage'
};