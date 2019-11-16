const Discord = require('discord.js');
const pagination = require('../commands/utils/pagination');
const discordTicketsDB = require('../models/discordTicketsDB');
const discordClosedTicketsDB = require('../models/discordClosedTicketsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function getDate() {
    let date = new Date();
    let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return `${date.toLocaleString('en-US', options)} EST`;
};

async function handleMultiTicket(bot, message, ticket) {
    let contentArr = [];
    ticket.forEach(el => {
        let content = { category: ["Multiple Tickets Found", "Please Specify a ticket ID to respond to\n`Example: #24 <Your Message>`"], fields: [] };
        if(el.initial_message.split(" ")[0] === "**Command**")
            content.fields.push({ field: `${el.id}`, value: `Command Error for ${el.initial_message.split(" ")[1]}\n\n**Opened On**: ${el.ticket_date}` });
        else {
            let initialMessage = el.initial_message.split("");
            let sampleMessage = '';
            if(initialMessage.length < 20) sampleMessage = initialMessage.join("");
            else for(let i = 0; i < 20; i++) { sampleMessage += initialMessage[i]; }
            content.fields.push({ field: `Ticket ID #${el.id}`, value: `${sampleMessage}\n\n**Opened On**: ${el.ticket_date}` });
        }
        contentArr.push(content);
    })
    pagination(message, bot, contentArr, { dm: true, color: 0xffff4d });
};

module.exports = {
    async handleTicket(bot, message) {
        /*
            Check if user already has an open ticket
            Ask if theyd like to open a new one
            Else open a ticket
        */
       discordTicketsDB.findByDiscordId(message.author.id)
        .then(ticket => {
            if(message.content.split("").length > 1000) 
                return message.author.send('Please limit your message to 1024 characters or less');
            if(ticket.length > 1 && message.content.split("")[0] !== "#") handleMultiTicket(bot, message, ticket);
            else if(ticket.length > 1 && message.content.split("")[0] === "#") {
                let args = message.content.split(" ");
                if(ticket.map(el => el.id).includes(parseInt(args[0].split("#").join(""))))
                    this.userResponse(bot, message, message.content.split(args[0]).join(" "), ticket[ticket.map(el => el.id).indexOf(parseInt(args[0].split("#").join(""), 10))]);
                else message.author.send("Invalid Ticket ID");
            }
            else this.userResponse(bot, message, message.content, ticket[0]);
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                this.openTicket(bot, message);
            else console.log(err);
        })
    },
    async openTicket(bot, message) {
        discordTicketsDB.save({ discord_id: message.author.id, initial_message: message.content, ticket_date: await getDate() })
            .then(ticket => {
                let responseEmbed = new Discord.RichEmbed();
                let serverEmbed = new Discord.RichEmbed();
                responseEmbed
                .setColor(0x00ff00)
                .addField("Ticket Received", 'A member from out support team will be with your shortly')
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
    async userResponse(bot, message, messageContent, ticket) {
        let embed = new Discord.RichEmbed();

        embed
        .setColor(0xffff4d)
        .addField('Response', `ID: ${ticket.id}`)
        .addBlankField()
        .addField('User:', message.author.username, true)
        .addField('Discord ID:', message.author.id, true)
        .addField('Message:', messageContent)
        .setFooter(`Received ${await getDate()}`)

        bot.channels.get('542561301302345760').send(embed);
        message.author.send('Message received')
    },
    async closeTicket(bot, message, ticket, reason) {
        discordTicketsDB.delete(ticket.id).catch(err => console.error(err));
        let data = {
            ticket_id: ticket.id, 
            discord_id: ticket.discord_id,
            initial_message: ticket.initial_message, 
            ticket_date: ticket.ticket_date,
            close_date: await getDate(),
            closed_by: message.author.id,
            reason: reason
        };
        discordClosedTicketsDB.save(data)
            .then(() => {
                let userEmbed = new Discord.RichEmbed();
                let serverEmbed = new Discord.RichEmbed();

                userEmbed
                .setColor(0xff0000)
                .addField(`Ticket Closed`, `ID: ${ticket.id}\n\nA member from our support team has closed your Ticket.\nIf this was a mistake, please send us another message`)
                .addField('Reason:', data.reason)
                .setFooter(`Closed On: ${data.close_date} by ${bot.users.get(data.closed_by).username}`)

                serverEmbed
                .setColor(0xff0000)
                .addField('Ticket Closed', `ID: ${ticket.id}`)
                .addField('Reason:', reason)
                .setFooter(`Closed by ${message.author.username} on ${data.close_date}`)

                bot.users.get(ticket.discord_id).send(userEmbed);
                bot.channels.get('542561301302345760').send(serverEmbed);
            })
            .catch(err => console.error(err));
    }
};