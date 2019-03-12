const Discord = require('discord.js');
const chalk = require('chalk');
const guildsDB = require('../../models/GuildModels/guildsDB');
const currencyDB = require('../../models/currencyDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const logger = require('../services/loggerServices');

function getDate() {
    let date = new Date();
    let options = {
        timezone: 'EST', 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
}

module.exports = {
    checkGuilds(bot) {
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
                        this.saveGuild(bot, {name: guild.name, id: guild.id});
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
    saveGuild(bot, guild) {
        guildsDB.save({ guild_name: guild.name, guild_id: guild.id })
            .then(() => {
                let embed = new Discord.RichEmbed();
                this.guildSettingsCheck(guild);
                embed
                .setTitle('**New Guild**')
                .addBlankField()
                .setColor('#00ff00')
                .addField('Name:', guild.name, true)
                .addField('ID:', guild.id, true)
                .addField('Member Count:', guild.memberCount)
                .setFooter(`Guild added: ${getDate()}`)

                if(guild.name !== 'RevenantEverest' && guild.name !== 'BOT-Testing')
                    bot.channels.get('538528459190829064').send(embed);
            })
            .catch(err => {
                //Log Error
                console.log(err);
            });
    },
    guildSettingsCheck(guild) {
        guildsDB.ifSettingsExist(guild.id)
            .then(() => this.currencySettingsCheck(guild))
            .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData)
                    this.saveDefaultGuildSettings(guild)
                else console.log(err);
            });
    },
    saveDefaultGuildSettings(guild) {
        guildsDB.saveDefaultSettings({ guild_id: guild.id, prefix: '?' })
            .then(() => this.currencySettingsCheck(guild))
            .catch(err => {
                //Log Error
                console.log("Hello", err);
            });
    },
    currencySettingsCheck(guild) {
        currencyDB.findCurrencySettings(guild.id)
            .catch(err => {
                if(err instanceof QRE && err.code === qrec.noData) {
                    this.saveDefaultCurrencySettings(guild)
                }
                else console.log("Hello World => ", err);
            });
    },
    saveDefaultCurrencySettings(guild) {
        currencyDB.saveDefaultSettings({
            guild_id: guild.id,
            currency_name: 'Kindling',
            currency_increase_rate: 10
        })
            .catch(err => {
                //Log Error
                console.log("SaveDefaultCurrencySettings");
            });
    },
    removeGuild(bot, guild) {
        let embed = new Discord.RichEmbed();
        embed
        .setTitle('**Removed Guild**')
        .addBlankField()
        .setColor('#ff0000')
        .addField('Name:', guild.name, true)
        .addField('ID:', guild.id, true)
        .addField('Member Count:', guild.memberCount)
        .setFooter(`Guild removed: ${getDate()}`)

        if(guild.name !== 'RevenantEverest' && guild.name !== 'BOT-Testing') 
            bot.channels.get('538528459190829064').send(embed);

        guildsDB.destroy(guild.id)
            .catch(err => {
                //Log Error
                console.error(err);
            });
    }
}
