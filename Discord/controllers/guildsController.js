const Discord = require('discord.js');
const chalk = require('chalk');
const guildsDB = require('../models/GuildModels/guildsDB');
const defaultSettingsController = require('./defaultSettingsController');
const utils = require('../commands/utils/utils');

const logger = require('../services/loggerServices');

async function handleEmbed(title, dateMessage, color, guild) {
    let date = await utils.getDate();
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

module.exports = {
    async checkGuilds(bot) {
        guildsDB.findAll()
            .then(dbGuilds => {
                let botGuilds = bot.guilds.array();

                /*  
                    Iterates through the Guilds in the DB, sees if they exist in the Guild Array given by the Discord API

                    if it exists in the Guild Array but not in the Guild DB
                */
                for(let i = 0; i < botGuilds.length; i++) {
                    if(dbGuilds.map(el => el.guild_id).includes(botGuilds[i].id)) continue;
                    else {
                        console.log(chalk.hex('#ff9900')("[LOG]") + " Adding Guild")
                        let guild = botGuilds[i];
                        this.saveGuild(bot, {name: guild.name, id: guild.id, memberCount: bot.guilds.get(guild.id).memberCount});
                    }
                }

                /*
                    Iterates through the Guilds Array given by the Discord API, sess if they exist in the Guilds DB

                    if it exists in the Guild DB but not in the Guild Array
                */
                for(let i = 0; i < dbGuilds.length; i++) {
                    if(botGuilds.map(el => el.id).includes(dbGuilds[i].guild_id)) continue; // Checks if the Guild Array element exists in the Guild DB
                    else {
                        console.log(chalk.hex('#ff9900')("[LOG]") + " Removing Guild")
                        let guild = dbGuilds[i];
                        this.removeGuild(bot, {name: guild.guild_name, id: guild.guild_id});
                    }
                }
                console.log(chalk.hex('#ff9900')("[LOG]") + " Guilds Checked");
            })
            .catch(err => console.error(err));
    },
    async saveGuild(bot, guild) {
        guildsDB.save({ guild_name: guild.name, guild_id: guild.id })
            .then(() => {
                defaultSettingsController.guildSettingsCheck(guild);
                defaultSettingsController.currencySettingsCheck(guild);
                defaultSettingsController.rankSettingsCheck(guild);
                handleEmbed('New Guild', 'Guild added', 0x00ff00, guild);
            })
            .catch(err => console.error(err));
    },
    async removeGuild(bot, guild) {
        guildsDB.destroy(guild.id)
        .then(() => handleEmbed('Guild Removed', 'Guild removed', 0xff0000, guild))
        .catch(err => console.error(err));
    }
}
