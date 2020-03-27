const config = require('../../config/config');
const Discord = require('discord.js');
const pagination = require('../utils/pagination');
const disabledCommandsDB = require('../../models/disabledCommandsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function parseCategoryFilter(categories, commands) {
    let counter = 0;
    let temp = [];
    let commandsTemp = [];
    let categoryFilter = categories.map(el => {
        return { name: el.name, desc: el.desc, commands: commands.filter(command => command.config.category === el.name) }
    });

    categoryFilter.forEach(el => {
        if((el.commands.length - 1) <= 5) {
            temp.push({ name: el.name, desc: el.desc, commands: el.commands });
        }
        else el.commands.forEach((command, idx) => {
            if(idx % 5 === 0 && idx !== 0) {
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

    return temp;
};

async function parseContentArr(contentArr, categoryFilter, dCommands) {
    let category = [];
    let fields = [];
    contentArr = [];
    categoryFilter.forEach(el => {
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

    return contentArr;
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

    let categoryFilter = await parseCategoryFilter(categories, commands);

    contentArr = await parseContentArr(contentArr, categoryFilter, dCommands);

    if(!args[1]) 
        return pagination(message, bot, contentArr, { flavorText: flavorText, color: 0xcc00ff });
    else if(categories.filter(el => el.name.toLowerCase() === args[1].toLowerCase()).length > 0) 
        return handleCategory();
    else if(bot.commands.get(args[1].toLowerCase()) || bot.commands.get(bot.aliases.get(args[1].toLowerCase()))) 
        return handleCommand();

    async function handleCommand() {
        let command = bot.commands.get(args[1].toLowerCase()).config || bot.commands.get(bot.aliases.get(args[1].toLowerCase())).config;
        let embed = new Discord.RichEmbed();

        embed
        .addField(`**${command.d_name}** - ${command.category} ${command.params ? (command.params.required ? '`<param>`' : '`[param]`') : ''}`, `${command.desc}`)
        .addBlankField()
        
        if(command.params) embed.addField('Params: ', command.params.params, true)

        if(command.aliases.length > 0) {
            let aliasText = '';
            command.aliases.forEach(el => aliasText += "`" + el + "` ");
            embed.addField('Aliases:', aliasText, true)
        }

        if(command.flags) {
            let flagText = '';
            command.flags.forEach(el => flagText += "`" + el + "` ");
            embed.addField('Flags:', flagText, true)
        } 

        embed
        .addField('Example:', "`" + PREFIX + command.example + "`")
        .addField(`More Info:`, `[Click Here](https://help.firesidebot.com)`)
        .setColor(0xcc00ff);

        return message.channel.send(flavorText, embed);
    };

    async function handleCategory() {
        let category = categories.filter(el => el.name.toLowerCase() === args[1].toLowerCase());
        let embed = new Discord.RichEmbed();
        if(commands.filter(el => el.config.category === category[0].name).length > 5) {
            contentArr = [];
            categoryFilter = await parseCategoryFilter(category, commands);
            contentArr = await parseContentArr(contentArr, categoryFilter, dCommands);

            return pagination(message, bot, contentArr, { flavorText: flavorText, color: 0xcc00ff });
        }

        embed
        .addField(`**${category[0].name}**`, `${category[0].desc}`)
        .addBlankField()
        .setColor(0xcc00ff);

        commands.filter(el => el.config.category === category[0].name).forEach(el => {
            let command = el.config;
            embed.addField(
                `**${command.d_name}** ${params ? (command.params.required ? '`<param>`' : '`[param]`') : ""} ${dCommands.includes(command.name) ? "<:Cross:624336361633218580>*Disabled*" : ""}`,
                command.desc === "" ? "*N/A*" : command.desc
            );
        });

        return message.channel.send(flavorText, embed);
    };
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