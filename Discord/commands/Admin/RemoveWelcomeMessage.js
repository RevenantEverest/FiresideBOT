const Discord = require('discord.js');
const db = require('../../models/welcomeMessageDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function deleteWelcomeMessage(bot, message, welcomeMessage) {
    db.delete(welcomeMessage.id)
    .then(() => message.channel.send("Welcome Message has been removed"))
    .catch(err => errorHandler(bot, message, err, "Error Deleting Welcome Message", "RemoveWelcomeMessage"));
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    db.findByGuildId(message.guild.id)
    .then(welcomeMessage => deleteWelcomeMessage(bot, message, welcomeMessage))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No welcome message found");
        else errorHandler(bot, message, err, "DB Error", "ViewWelcomeMessage");
    })
};

module.exports.config = {
    name: 'removewelcomemessage',
    d_name: 'RemoveWelcomeMessage',
    aliases: ['rwm'],
    category: 'Admin',
    desc: `Remove the current Welcome Message (Also disables Welcome Message)`,
    example: 'removewelcomemessage'
};