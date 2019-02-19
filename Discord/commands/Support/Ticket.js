const Discord = require('discord.js');
const config = require('../../../config/config');

async function respondToTicket(message, args, bot) {
    if(!args[2]) return message.channel.send(`Please specify the ID of the ticket you'd like to close`);
    if(!config.tickets.open_tickets.includes(parseInt(args[2], 10))) return message.channel.send(`Invalid ticket ID`);

    let openTicketIndex = config.tickets.open_tickets.indexOf(args[2]);
    let ticket = config.tickets.open_tickets[openTicketIndex];

    args.splice(1, 1);
    args.splice(2, 1);

    bot.users.get(ticket.id).send(args.join(" "));
    message.channel.send('Message sent!');
};

async function closeTicket(message, args, bot) {

    if(!args[2]) return message.channel.send(`Please specify the ID of the ticket you'd like to close`);
    if(config.tickets.open_tickets.indexOf(args[2]) === -1) return message.channel.send(`Invalid ticket ID`);

    let openTicketIndex = config.tickets.open_tickets.indexOf(args[2]);
    let ticket = config.tickets.open_tickets[openTicketIndex];
    
    config.tickets.open_tickets.splice(openTicketIndex, 1);
    config.tickets.closed_tickets.push(ticket);

    bot.channels.get('542561301302345760').send(`Closed ticket ID:#${ticket.id}`);
};

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(args[1] === '-r')
        respondToTicket(message, args, bot);
    if(args[1] === '-c')
        closeTicket(message, args, bot);
};

module.exports.config = {
    name: 'ticket',
    d_name: 'Ticket',
    aliases: [],
    params: { required: true, params: 'Message' },
    category: ['dev', 'Dev'],
    desc: 'Respond to / Close an open Ticket'
};