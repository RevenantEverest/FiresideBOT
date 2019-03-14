const Discord = require('discord.js');
const config = require('../../../config/config');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(args.includes('-m')) {
        args.splice(args.indexOf('-m'), 1);
        args.splice(0, 1);

        /* 
            TODO: Save ticket to DB and message response should include ticket ID 
        */

        //Placeholder
        config.tickets.id++;
        let ticket_id = config.tickets.id;
        config.tickets.open_tickets.push({ ticket_id: ticket_id, username: message.author.username, id: message.author.id, message: args.join(" "), ticket_status: 'open' });

        let embed = new Discord.RichEmbed();
        embed
        .setTitle('**Support Ticket**')
        .setColor(0xffcc00)
        .addField('Ticket ID', `#${ticket_id}`)
        .addField('Username:', message.author.username, true)
        .addField('ID:', message.author.id, true)
        .addField('Message:', args.join(" "))

        bot.channels.get('542561301302345760').send(embed);
        message.channel.send("Your ticket `" + `#${ticket_id}` + "` has been sent, a Support Team Member will respond when they're available");
    }
    else if(args[1] && !args.includes("-m"))
        return message.channel.send(`If you'd like to send a Support Ticket, please use the flag ` + "`" + '-m' + "` before or after your message");
    else if(!args[1]) return message.channel.send('https://discord.gg/TqKHVUa');
};

module.exports.config = {
    name: 'support',
    d_name: 'Support',
    aliases: [],
    category: 'Support',
    desc: 'Sends a link to the Support Discord Server',
    example: 'support'
}