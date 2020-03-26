const config = require('../config/config');
const Discord = require('discord.js');
const customCommandsDB = require('../models/customCommandsDB');
const guildLogSettings = require('../models/GuildModels/guildLogSettingsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const adjectives = ['Handy', 'Diligent', 'Wonderful', 'Curious', 'Helpful', 'Excited', 'Understanding', 'Hopeful'];
const nouns = ['Dogs', 'Buildings', 'Dice', 'Trees', 'Cats', 'Ice', 'Records', 'Computers'];

async function RNG(num) { return Math.floor(Math.random() * num); }

async function updateCustomCommandName(bot, customCommand, guildCustomCommands) {

    let updatedName = null;
    let counter = 0;
    while(!updatedName && counter < 10) {
        let temp = `${adjectives[await RNG(adjectives.length)]}${nouns[await RNG(nouns.length)]}`;
        if(!guildCustomCommands.includes(temp.toLowerCase()))
            updatedName = temp;
    };

    customCommandsDB.update({ guild_id: customCommand.guild_id, id: customCommand.id, input: updatedName.toLowerCase(), output: customCommand.output })
    .then(updatedCommand => checkForLogSettings(bot, customCommand, updatedCommand))
    .catch(err => console.error(err));
};

async function checkForLogSettings(bot, oldCommand, newCommand) {
    guildLogSettings.findByGuildId(oldCommand.guild_id)
    .then(logSettings => logSettings.enabled ? notifyServer(bot, oldCommand, newCommand, logSettings.channel_id) : findGeneralOrTopChannel(bot, oldCommand, newCommand))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return findGeneralOrTopChannel(bot, oldCommand, newCommand);
        else console.error(err);
    })
};

async function findGeneralOrTopChannel(bot, oldCommand, newCommand) {
    const channels = bot.guilds.get(oldCommand.guild_id).channels.array();
    let notifyChannel = { general: null, channels: null };
    for(let i = 0; i < channels.length; i++) {
        if(channels[i].type !== 'text') continue;
        if(/^.*general.*$/i.test(channels[i].name)) {
            if(!notifyChannel.general || channels[i].position < notifyChannel.general.position)
                notifyChannel.general = channels[i];
        }    
        else if(!notifyChannel.channels || channels[i].position < notifyChannel.channels.position)
            notifyChannel.channels = channels[i];
    }

    if(notifyChannel.general) return notifyServer(bot, oldCommand, newCommand, notifyChannel.general.id)
    else return notifyServer(bot, oldCommand, newCommand, notifyChannel.channels.id);
};

async function notifyServer(bot, oldCommand, newCommand, channel_id) {
    let embed = new Discord.RichEmbed();

    embed
    .setColor(0xff6600)
    .setTitle(`⚠️ Notice ⚠️`)
    .setDescription(
        `A custom command has been updated due to interfering with a default **Fireside** command\n\n` +
        `**Old Name:** ${oldCommand.input}\n` +
        `**Updated Name:** ${newCommand.input}\n\n` + 
        `This name can be updated by using the **EditCommand** command with the **-n** flag`
    )
    bot.channels.get(channel_id).send(embed);
};

module.exports = async (bot) => {
    customCommandsDB.findAll()
    .then(customCommands => {
        let commandAliases = [].concat.apply([],config.commands.map(el => el.aliases));
        let commandNames = config.commands.map(el => el.name).concat(commandAliases);

        customCommands.forEach(el => {
            if(commandNames.includes(el.input))
                return updateCustomCommandName(bot, el, customCommands.filter(cCommand => cCommand.guild_id === el.guild_id));
        });
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
};