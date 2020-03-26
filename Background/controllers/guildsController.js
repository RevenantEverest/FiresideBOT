const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const guildsDB = require('../models/guildsDB');

const defaultSettingsController = require('./defaultSettingsController');
const services = {};

async function handleEmbed(bot, title, dateMessage, color, guild) {
    let date = moment().format("LLLL") + " EST";
    let embed = new Discord.RichEmbed();

    embed
    .setTitle(`**${title}**`)
    .addBlankField()
    .setColor(color)
    .addField('Name:', guild.name, true)
    .addField('ID:', guild.id, true)
    .addField('Member Count:', parseInt(guild.memberCount, 10).toLocaleString())
    .setFooter(`${dateMessage}: ${date}`)

    if(process.env.ENVIRONMENT !== "DEV") bot.channels.get('538528459190829064').send(embed);
};

services.checkGuilds = async (bot) => {
    let botGuilds = bot.guilds.array();

    guildsDB.findAll()
    .then(dbGuilds => checkForAddedGuilds(dbGuilds))
    .catch(err => console.error(err));

    async function checkForAddedGuilds(dbGuilds) {
        botGuilds.forEach((el, idx) => {
            if(!dbGuilds.map(guild => guild.guild_id).includes(el.id))
                services.saveGuild(bot, {name: el.name, id: el.id, memberCount: bot.guilds.get(el.id).memberCount});
            
            if(idx === (botGuilds.length - 1)) return checkForRemovedGuilds(dbGuilds);
        });
    };

    async function checkForRemovedGuilds(dbGuilds) {
        dbGuilds.forEach((el, idx) => {
            if(!botGuilds.map(guild => guild.id).includes(el.guild_id)) 
                services.removeGuild(bot, {name: el.name, id: el.guild_id});
            
            if(idx === (dbGuilds.length - 1)) return console.log(chalk.hex('#ff9900')("[LOG]") + " Guilds Checked");
        });
    };
};

services.removeGuild = async (bot, guild) => {
    guildsDB.destroy(guild.id)
    .then(() => {
        handleEmbed(bot, 'Guild Removed', 'Guild removed', 0xff0000, guild);
        console.log(chalk.hex('#ff9900')("[LOG]") + " Removing Guild");
    })
    .catch(err => console.error(err));
};

services.saveGuild = async (bot, guild) => {
    guildsDB.save({ name: guild.name, guild_id: guild.id, date: moment() })
    .then(() => {
        defaultSettingsController.checkDefaultSettings(guild.id);
        handleEmbed(bot, 'New Guild', 'Guild added', 0x00ff00, guild);
        console.log(chalk.hex('#ff9900')("[LOG]") + " Adding Guild");
    })
    .catch(err => console.error(err));
};

module.exports = services;