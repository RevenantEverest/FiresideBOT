const db = require('../models/newMemberMessagesDB');
const services = {};

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('./errorHandler');

services.getByGuildId = async (bot, guild, member) => {
    db.findByGuildId(guild.id)
    .then(newMemberMessages => services.parseMessage(bot, guild, member, newMemberMessages))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else errorHandler({ controller: "New Member Messages Controller", message: "Error Finding New Member Messages", error: err });
    });
};

services.parseMessage = async (bot, guild, member, newMemberMessages) => {
    if(!newMemberMessages.enabled) return;
    if(newMemberMessages.length < 1) return;

    let randomIndex = Math.floor(Math.random() * newMemberMessages.messages.length - 1);
    let message = newMemberMessages.messages[randomIndex < 0 ? 0 : randomIndex];

    if(message === "") return;
    if(/\${.*}/gi.test(message)) {
        let variables = message.match(/\${([^}]*)}/g);

        variables.forEach(async (el, idx) => {
            let exec = /\${([^}]*)}/.exec(el)[1];

            if(exec.toLowerCase() === "touser") message = message.replace("${" + exec + "}", member.user);
            
            if(exec.toLowerCase() === "membercount") {
                let memberCount = bot.guilds.resolve(guild.id).memberCount.toString();
                let contraction = "";
                switch(memberCount.split("")[memberCount.length - 1]) {
                    case "1":
                        contraction = "st";
                        break;
                    case "2":
                        contraction = "nd";
                        break;
                    case "3": 
                        contraction = "rd";
                        break;
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "0":
                        contraction = "th";
                        break;
                    default:
                        break;
                }
                message = message.replace("${" + exec + "}", `${memberCount}${contraction}`);
            }

            if(exec.includes(",")) {
                let choices = exec.split(",");
                let randomResponse = choices[Math.floor(Math.random() * choices.length)];
                output = output.replace(/\${([^}]*)}/, randomResponse);
            }

            if(idx === (variables.length - 1)) 
                return bot.channels.resolve(newMemberMessages.channel_id).send(message);
        });
    }
    else return bot.channels.resolve(newMemberMessages.channel_id).send(message);
};

module.exports = services;