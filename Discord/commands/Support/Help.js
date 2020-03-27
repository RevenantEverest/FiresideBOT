const config = require('../../config/config');
const Discord = require('discord.js');
const pagination = require('../utils/pagination');
const disabledCommandsDB = require('../../models/disabledCommandsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

function helpSpec(PREFIX, message, args, bot, contentArr) {
    let embed = new Discord.RichEmbed();
    embed.setColor(0xcc00ff);
    let flavorText = "`<param>` is a required param and `[param]` is an optional param. For more information on a command use `" + PREFIX + "help <command>` ™";

    if(contentArr[contentArr.map(e => e.category[0].toLowerCase()).indexOf(args[1].toLowerCase())]) {
      let helpInfo = contentArr[contentArr.map(e => e.category[0].toLowerCase()).indexOf(args[1].toLowerCase())];
      embed.addField(`**${helpInfo.category[0]}**`, `${helpInfo.category[1]}`).addBlankField();
      helpInfo.fields.forEach(el => embed.addField(`${el.field}`, `${el.value}`, el.inline));
    } 
    else if(bot.commands.get(args[1].toLowerCase()) || bot.commands.get(bot.aliases.get(args[1].toLowerCase()))) {
        let helpInfo = bot.commands.get(bot.aliases.get(args[1].toLowerCase())) || bot.commands.get(args[1].toLowerCase());
        
        /* Variable redefinition required for aliases to apply */
        helpInfo = helpInfo.config;

        embed
        .addField(`**${helpInfo.d_name}** - ${helpInfo.category} ${helpInfo.params ? (helpInfo.params.required ? '`<param>`' : '`[param]`') : ''}`, `${helpInfo.desc}`)
        .addBlankField()
        
        if(helpInfo.params) embed.addField('Params: ', helpInfo.params.params, true)

        if(helpInfo.aliases.length > 0) {
        let aliasText = '';
        helpInfo.aliases.forEach(el => aliasText += "`" + el + "` ");
        embed.addField('Aliases:', aliasText, true)
        }

        if(helpInfo.flags) {
        let flagText = '';
        helpInfo.flags.forEach(el => flagText += "`" + el + "` ");
        embed.addField('Flags:', flagText, true)
        } 

        embed
        .addField('Example:', "`" + PREFIX + helpInfo.example + "`")
        .addField(`More Info:`, `[Click Here](https://help.firesidebot.com)`)
    }
    else
      return message.channel.send('Invalid Command or Category');

    message.channel.send(flavorText, embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let categories = config.categories.filter(el => el.name !== "Dev");
    let flavorText = "`<param>` is a required param and `[param]` is an optional param. For more information on a command use `" + PREFIX + "help <command>` ™";
    let contentArr = [
      {
        category: [`Welcome to the FiresideBOT Help Command`, 'Need immediate help? Message Fireside to open a ticket'],
        fields: [
          {
            field: 'Available Categories:',
            value: categories.map(el => el.name).join(" **|** ")
          },
          {
            field: 'How To Use:',
            value: 'Use the reactions below to move back and forth through the menu',
            inline: true
          },
          {
            field: 'More Info:',
            value: 'To get more info about a command or category use the help command again with the desired command or category afterwards\n`Example: ' + PREFIX + 'help Music`',
            inline: true
          }
        ]
      }
    ];  
    let commands = bot.commands.array();
    let dCommands = [];

    await disabledCommandsDB.findByGuildId(message.guild.id)
    .then(commands => dCommands = commands.map(el => el.command))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });

    categories = categories.map(el => {
        return { name: el.name, desc: el.desc, commands: commands.filter(command => command.config.category === el.name) }
    });

    let counter = 0;
    let temp = [];
    let commandsTemp = [];
    categories.forEach(el => {
        if((el.commands.length - 1) <= 5) {
            temp.push({ name: el.name, desc: el.desc, commands: el.commands });
        }
        else el.commands.forEach((command, idx) => {
            if(idx % 5 === 0 && idx !== 0 || idx === (el.commands.length - 1)) {
                counter ++;
                let name = `${el.name} ${counter}/${Math.ceil(el.commands.length / 5)}`;
                temp.push({name: name, desc: el.desc, commands: commandsTemp });
                commandsTemp = [];
            } 
            else  commandsTemp.push(command);

            if(idx === (el.commands.length - 1)) {
                counter ++;
                let name = `${el.name} ${counter}/${Math.ceil(el.commands.length / 5)}`;
                temp.push({name: name, desc: el.desc, commands: commandsTemp });
                commandsTemp = [];
                counter = 0;
            }
        });
    });

    categories = temp;

    let category = [];
    let fields = [];
    categories.forEach((el, idx) => {
        category = [`**${el.name}**`, el.desc];
        el.commands.forEach(command => {
            command = command.config;
            params = command.params;
            fields.push({
                field: `**${command.d_name}** ${params ? (params.required ? '`<param>`' : '`[param]`') : ""} ${dCommands.includes(command.name) ? "<:Cross:624336361633218580>*Disabled*" : ""}`,
                value: command.desc === "" ? "*N/A*" : command.desc,
                inline: false
            });
        });
        contentArr.push({ category: category, fields: fields });
        fields = [];
    });

    if(!args[1]) pagination(message, bot, contentArr, { flavorText: flavorText, color: 0xcc00ff });
    else helpSpec(PREFIX, message, args, bot, contentArr);
};

module.exports.config = {
    name: 'help',
    d_name: 'Help',
    aliases: [],
    params: { required: false, params: 'Category or Command' },
    category: 'Support',
    desc: 'Displays Help embed',
    example: 'help economy'
};