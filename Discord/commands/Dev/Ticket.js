const Discord = require('discord.js');
const { dates } = require("../../utils");
const discordTicketsDB = require('../../models/discordTicketsDB');
const discordClosedTicketsDB = require('../../models/discordClosedTicketsDB');
const ticketsController = require('../../controllers/ticketsController');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getTicket(id, bot, message) {
    return discordTicketsDB.findById(id).catch(err => console.error(err));
};

async function displayOpenTickets(bot, args, message) {
    discordTicketsDB.findAll()
    .then(tickets => {
        let embed = new Discord.MessageEmbed();
        let ticketID = '';
        let mostRecent = null;

        tickets.forEach(el => {
            ticketID += ` ${el.id}\n`;
            if(!mostRecent || el.id > mostRecent.id) mostRecent = el;
        });

        if(ticketID.split("").length > 1000) return;

        embed
        .setColor(0x00ff00)
        .addField(`**Open Tickets**`, `**Amount:** ${tickets.length}`)
        .addField(`Ticket ID's:`, ticketID, true)
        .addField('Most Recent:', `**ID:** ${mostRecent.id}\n**User:** ${bot.users.resolve(mostRecent.discord_id)}\n**Date Received:** ${mostRecent.ticket_date}`)
            
        message.channel.send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No open tickets");
        else console.error(err);
    })
};

async function displayClosedTickets(bot, args, message) {
    discordClosedTicketsDB.findAll()
    .then(tickets => {
        let embed = new Discord.MessageEmbed();
        let mostRecent = tickets[tickets.length - 1];

        embed
        .setColor(0x00ff00)
        .setTitle(`**Closed Tickets**`, `**Amount:** ${tickets.length}`)
        .addField('Most Recent:', `**ID:** ${mostRecent.ticket_id}\n**User:** ${bot.users.resolve(mostRecent.discord_id)}\n` + 
                                      `**Closed By:** ${mostRecent.closed_by}\n**Date Closed:** ${mostRecent.close_date}`)

        message.channel.send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No closed tickets");
        else console.error(err);
    });
};

async function displayTicket(bot, args, message) {
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Please specify a valid Ticket ID");

    let ticket = await getTicket(parseInt(args[1], 10));
    let embed = new Discord.MessageEmbed();

    embed
    .setColor(0x00ff00)
    .addField('Ticket', `ID: ${ticket.id}`)
    .addField('User:', bot.users.resolve(ticket.discord_id).username, true)
    .addField('Discord ID:', ticket.discord_id, true)
    .addField('Message:', ticket.initial_message)
    .setFooter(`Received ${ticket.ticket_date}`)

    message.channel.send(embed);
};

async function respondToTicket(bot, args, message) {
    let ticket = await getTicket(parseInt(args[2], 10), bot, message);
    let embed = new Discord.MessageEmbed();

    if(!ticket) return message.channel.send("Ticket not found");

    args.splice(2, 1);
    args.splice(1, 1);
    args.splice(0, 1);

    embed
    .setColor(0xffff4d)
    .setTitle('**RESPONSE**')
    .addField('Support Member:', message.author.username)
    .addField('Message:', args.join(" "))
    .setFooter(`Message sent ${await dates.getDate()}`)

    bot.users.resolve(ticket.discord_id).send(embed);
    message.channel.send(`Response sent by **${message.author.username}** to Ticket **#${ticket.id}** on ${await dates.getDate()}`);
};

async function closeTicket(bot, args, message) {
    let ticket = await getTicket(parseInt(args[2], 10), bot, message);
    if(!ticket) return message.channel.send("Ticket not found");
    let reason = 'No Reason Given';
    if(args[3]) {
        args.splice(2, 1);
        args.splice(1, 1);
        args.splice(0, 1);
        reason = args.join(" ");
    }

    ticketsController.closeTicket(bot, message, ticket, reason);
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    /*
        Only allow users with the support role in FiresideBOT to respond to and manipulate tickets
    */
    if(message.author.id !== "163346982709100546") return;
    if(!args[1]) return displayOpenTickets(bot, args, message);
    if(!args[2] && args[1] !== "-ct") return displayTicket(bot, args, message);
    if(!Number.isInteger(parseInt(args[2], 10)) && args[1] !== "-ct") return message.channel.send("Please specify a Ticket ID");

    if(args[1] === "-ct") displayClosedTickets(bot, args, message);
    if(args[1] === "-r") respondToTicket(bot, args, message);
    if(args[1] === "-c") closeTicket(bot, args, message);
    else if(Number.isInteger(parseInt(args[1], 10))) displayTicket(bot, args, message);
    
};

module.exports.config = {
    name: 'ticket',
    d_name: 'Ticket',
    aliases: ['tickets'],
    params: { required: true, params: 'Message' },
    category: 'Dev',
    desc: 'Respond to / Close an open Ticket',
    example: 'ticket -r Thank you for your feedback, how can I help you?'
};