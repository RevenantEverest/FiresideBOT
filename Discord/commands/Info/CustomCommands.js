const db = require('../../models/customCommandsDB');
const Discord = require('discord.js');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const pagination = require('../utils/pagination');
const errorHandler = require('../../controllers/errorHandler');

/*
  ContentArr Parsing Example:

  contentArr = [
    {
      category: '',
      fields: [
        {
          field: '',
          value: ''
        }
      ]
    }
  ]

  Options Parsing Example:

  options = {
    time: 1,
    thumbnail: '',
    flavorText: '',
    color: 0xff0000,
    title: true,
    author: true
  }

*/

async function parseData(bot, message, args, commands) {
    let category = `Custom Commands`;
    let author = { text: message.guild.name, image: message.guild.iconURL };
    
    if(commands.length <= 5) {
        let embed = new Discord.RichEmbed();
        embed
        .setAuthor(author.text, author.image)
        .setTitle(category)
        .setColor(0xff66b3)

        commands.forEach((el, idx) => embed.addField(`${idx + 1}. ${el.input.charAt(0).toUpperCase() + el.input.slice(1)} **[** ID: ${el.id} **]**`, el.output));
        return message.channel.send(embed);
    }

    let contentArr = [];
    let fields = [];
    let counter = 0;
    for(let i = 0; i < commands.length; i++) {
        counter++;
        fields.push({ 
            field: `${i + 1}. ${commands[i].input.charAt(0).toUpperCase() + commands[i].input.slice(1)} **[** ID: ${commands[i].id} **]**`, 
            value: commands[i].output
        });
        if(counter === 5) {
            contentArr.push({
                category: category,
                author: author,
                fields: fields
            });
            counter = 0;
            fields = [];
        }

        if(i === (commands.length - 1)) {
            contentArr.push({ category: category, author: author, fields: fields });
            pagination(message, bot, contentArr, { title: true, color: 0xff66b3 })
        }
    }
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    db.findByGuildId(message.guild.id)
    .then(commands => parseData(bot, message, args, commands))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return message.channel.send("No Custom Commands Found");
        else errorHandler(bot, message, err, "Error Finding Commands", "CustomCommands");
    })
};

module.exports.config = {
    name: 'customcommands',
    d_name: 'CustomCommands',
    aliases: ['customcommand', 'custcom', 'cc'],
    category: 'Admin',
    desc: 'Custom Command',
    example: `customcommands`
};