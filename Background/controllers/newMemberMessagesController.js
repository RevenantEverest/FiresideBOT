const db = require('../models/newMemberMessagesDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

services.getByGuildId = async (bot, guild, member) => {
    db.findByGuildId(guild.id)
    .then(newMemberMessages => services.parseMessage(bot, guild, member, newMemberMessages))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
};

services.parseMessage = async (bot, guild, member, newMemberMessages) => {
    if(!newMemberMessages.enabled) return;

    let message = newMemberMessages.messages[Math.floor(Math.random() * newMemberMessages.messages.length - 1)];

    if(/\${.*}/gi.test(message)) {
        let variables = message.match(/\${([^}]*)}/g);

        variables.forEach(async (el, idx) => {
            let exec = /\${([^}]*)}/.exec(el)[1];

            if(exec.toLowerCase() === "user") message = message.replace("${" + exec + "}", member.user);
            
            if(exec.toLowerCase() === "membercount") {
                let memberCount = bot.guilds.get(guild.id).memberCount;
                message = message.replace("${" + exec + "}", memberCount)
            }

            if(exec.includes(",")) {
                let choices = exec.split(",");
                let randomResponse = choices[Math.floor(Math.random() * choices.length)];
                output = output.replace(/\${([^}]*)}/, randomResponse);
            }

            if(idx === (variables.length - 1)) 
                return bot.channels.get(newMemberMessages.channel_id).send(message);
        });
    }
    else return bot.channels.get(newMemberMessages.channel_id).send(message);
};

module.exports = services;