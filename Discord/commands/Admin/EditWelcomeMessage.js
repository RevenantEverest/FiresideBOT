const Discord = require('discord.js');
const db = require('../../models/welcomeMessageDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');


async function save(bot, message, welcomeMessage) {
    db.save({ guild_id: message.guild.id, message: welcomeMessage })
    .then(() => message.channel.send("Welcome Message updated!"))
    .catch(err => errorHandler(bot, message, err, "Error Saving Welcome Message", "EditWelcomeMessage"));
};

async function update(bot, message, oldWelcomeMessage, newWelcomeMessage) {
    db.update({ id: oldWelcomeMessage.id, guild_id: message.guild.id, message: newWelcomeMessage })
    .then(() => message.channel.send("Welcome Message updated!"))
    .catch(err => errorHandler(bot, message, err, "Error Updating Welcome Message", "EditWelcomeMessage"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a desired Welcome Message");
    args.splice(0, 1);
    console.log(args.join(" "))
    let messageLength = args.join(" ").split("").length;
    if(messageLength > 1024) return message.channel.send(`Exceeded character limit by **${message.length - 1024}** characters.`);
    db.findByGuildId(message.guild.id)
    .then(welcomeMessage => update(bot, message, welcomeMessage, args.join(" ")))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            save(bot, message, args.join(" "));
        else errorHandler(bot, message, err, "DB Error", "EditWelcomeMessage");
    })
};

module.exports.config = {
    name: 'editwelcomemessage',
    d_name: 'EditWelcomeMessage',
    aliases: ['ewm'],
    params: {required: true, params: 'Message (1024 Character Limit)'},
    category: 'Admin',
    desc: `Edit a welcome message that get's sent to anyone who joins the server (Also enables Welcome Message)`,
    example: 'editwelcomemessage Thank you for joining my server!'
};