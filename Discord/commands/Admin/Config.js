const Discord = require('discord.js');
const guildsDB = require('../../models/GuildModels/guildsDB');
const currencyDB = require('../../models/currencyDB');

/*
    Currency Settings
    Prefix
*/

async function handleConfigDisplay(PREFIX, srgs, message) {
    let embed = new Discord.RichEmbed();
    currencyDB.findCurrencySettings(message.guild.id)
        .then(cSettings => {
            embed
            .setTitle('**Config**')
            .setThumbnail(message.guild.iconURL)
            .setColor(0x996633)
            .addBlankField()
            .addField('Prefix: (`-p`)', PREFIX)
            .addField('Currency Name: (`-cn`)', cSettings.currency_name, true)
            .addField('Currency Increase Rate: (`-cir`)', `${cSettings.currency_increase_rate}`, true)

            message.channel.send(embed);
        })
        .catch(err => console.error(err));
};

async function handlePrefix(PREFIX, args, message) {
    args.splice(0, 1);
    args.splice(args.indexOf('-p'), 1);
    guildsDB.updateSettings({ guild_id: message.guild.id, prefix: args.join("") })
        .then(() => message.channel.send("Server Prefix updated to: `" + args.join("") + "`"))
        .catch(err => {
            console.error(err);
            message.channel.send('An error has occurred, sorry for the inconvenience');
        })
};

/*
    Updates Currency Increase Rate
*/
async function handleCurrencyName(PREFIX, args, message) {
    args.splice(0, 1);
    args.splice(args.indexOf('-cn'), 1);
    currencyDB.updateCurrencyName({ currency_name: args.join(" "), guild_id: message.guild.id })
        .then(() => message.channel.send("Server Currency name updated to: `" + args.join(" ") + "`"))
        .catch(err => {
            console.error(err);
            message.channel.send('An error has occurred, sorry for the inconvenience');
        })
};

/*
    Updates Currency Increase Rate
*/
async function handleCurrencyIncreaseRate(PREFIX, args, message) {
    args.splice(0, 1);
    args.splice(args.indexOf('-cir'), 1);
    if(!Number.isInteger(parseInt(args.join(""), 10))) return message.channel.send('Please specify an integer value');
    currencyDB.updateCurrencyIncreaseRate({ currency_increase_rate: parseInt(args.join(""), 10), guild_id: message.guild.id })
        .then(() => {
            message.cchannel.send("Server Currency Increase Rate updated to: `" + args.join("") + "`");
        })
        .catch(err => {
            console.error(err);
            message.channel.send('An error has occurred, sorry for the inconvenience');
        })
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) handleConfigDisplay(PREFIX, args, message);
    if(args.includes('-p')) handlePrefix(PREFIX, args, message);
    if(args.includes('-cn')) handleCurrencyName(PREFIX, args, message);
    if(args.includes('-cir')) handleCurrencyIncreaseRate(PREFIX, args, message);
};

module.exports.config = {
    name: 'config',
    d_name: 'Config',
    aliases: [],
    params: { required: false, params: '' },
    flags: ['-p', '-cn', '-cir'],
    category: 'Admin',
    desc: 'Configure FiresideBOT',
    example: 'config'
}