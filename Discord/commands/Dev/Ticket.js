const Discord = require('discord.js');
const utils = require('../utils/utils');
const discordTicketsDB = require('../../../models/discordTicketsDB');
const ticketsController = require('../../controllers/ticketsController');

async function getTicket(id, bot, message) {
    return discordTicketsDB.findById(id)
            .catch(err => {
                console.error(err);
            });
};

async function displayTicket(bot, message) {

};

async function respondToTicket(bot, args, message) {
    let ticket = await getTicket(parseInt(args[2], 10), bot, message);
    let embed = new Discord.RichEmbed();

    if(!ticket) return message.channel.send("Ticket not found");

    args.splice(2, 1);
    args.splice(1, 1);
    args.splice(0, 1);

    embed
    .setColor(0xffff4d)
    .setTitle('Ticket Response')
    .addBlankField()
    .addField('Support Member:', message.author.username)
    .addField('Message:', args.join(" "))
    .setFooter(`Message sent ${await utils.getDate()}`)

    bot.users.get(ticket.discord_id).send(embed);
    message.channel.send(`Response sent by ${message.author.username} to Ticket #${ticket.id} on ${await utils.getDate()}`);
};

async function closeTicket(bot, args, message) {
    let ticket = await getTicket(parseInt(args[2], 10), bot, message);
    if(!ticket) return 

    ticketsController.closeTicket(bot, message, ticket);
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    /*
        Only allow users with the support role in FiresideBOT to respond to and manipulate tickets
    */
   
    if(!args[1]) return message.channel.send("Please specify an appropriate flag and a Ticket ID");
    if(!args[2]) return message.channel.send("Please specify a Ticket ID");

    if(args[1] === "-r") respondToTicket(bot, args, message);
    if(args[1] === "-c") closeTicket(bot, args, message);
    // if(args[1] === "-t") displayOpenTickets(message, args, bot);
};

module.exports.config = {
    name: 'ticket',
    d_name: 'Ticket',
    aliases: [],
    params: { required: true, params: 'Message' },
    category: 'Dev',
    desc: 'Respond to / Close an open Ticket',
    example: 'ticket -r Thank you for your feedback, how can I help you?'
};