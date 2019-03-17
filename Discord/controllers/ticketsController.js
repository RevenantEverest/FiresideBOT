const Discord = require('discord.js');
const utils = require('../commands/utils/utils');
const discordTicketsDB = require('../../models/discordTicketsDB');
const discordClosedTicketsDB = require('../../models/discordClosedTicketsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    async handleTicket(bot, message) {
        /*
            Check if user already has an open ticket
            Ask if theyd like to open a new one
            Else open a ticket
        */
       discordTicketsDB.findByDiscordId(message.author.id)
        .then(ticket => {
            
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                this.openTicket(bot, message);
            else console.log(err);
        })
    },
    async openTicket(bot, message) {
        discordTicketsDB.save({ discord_id: message.author.id, initial_message: message.content, ticket_date: await utils.getDate() })
            .then(ticket => {
                let responseEmbed = new Discord.RichEmbed();
                let serverEmbed = new Discord.RichEmbed();
                responseEmbed
                .setColor(0x00ff00)
                .addField("Ticket Received", 'A memeber from out support team will be with your shortly')
                .setFooter(`ID: ${ticket.id}`)

                serverEmbed
                .setColor(0x00ff00)
                .addField('New Ticket', `ID: ${ticket.id}`)
                .addBlankField()
                .addField('User:', message.author.username, true)
                .addField('Discord ID:', message.author.id, true)
                .addField('Message:', ticket.initial_message)
                .setFooter(`Received ${ticket.ticket_date}`)

                message.author.send(responseEmbed);
                bot.channels.get('542561301302345760').send(serverEmbed);
            })
            .catch(err => console.error(err));
    },
    async closeTicket(bot, message, ticket) {
        discordTicketsDB.delete(ticket.id).catch(err => console.error(err));
        let data = {
            ticket_id: ticket.id, 
            discord_id: ticket.discord_id,
            initial_message: ticket.initial_message, 
            ticket_date: ticket.ticket_date,
            close_date: await utils.getDate(),
            closed_by: message.author.id
        };
        discordClosedTicketsDB.save(data)
            .then(closedTicket => {
                let userEmbed = new Discord.RichEmbed();
                let serverEmbed = new Discord.RichEmbed();

                userEmbed
                .setColor(0xff0000)
                .addField(`Ticket Closed`, 'A memeber from out support team has closed your Ticket.\nIf this was a mistake, please send us another message')
                .setFooter(`ID: ${ticket.id}`)

                serverEmbed
                .setColor(0xff0000)
                .addField('Ticket Closed', `ID: ${ticket.id}`)
                .setFooter(`Closed by ${message.author.username} on ${data.close_date}`)

                bot.users.get(ticket.discord_id).send(userEmbed);
                bot.channels.get('542561301302345760').send(serverEmbed);
            })
            .catch(err => console.error(err));
    }
};