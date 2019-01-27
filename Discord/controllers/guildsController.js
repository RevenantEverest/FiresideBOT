const Discord = require('discord.js');
const guildsDB = require('../../models/GuildModels/guildsDB');
const currencyDB = require('../../models/currencyDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

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

                bot.channels.get('538528459190829064').send(embed)
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
        .setFooter(`Guild added: ${getDate()}`)

        bot.channels.get('538528459190829064').send(embed);
        guildsDB.destroy(guild.id)
            .catch(err => {
                //Log Error
                console.log(err);
            });
    }
}
