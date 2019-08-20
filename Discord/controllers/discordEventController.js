const config = require('../config/config');
const Discord = require('discord.js');
const chalk = require('chalk');
const logger = require('../services/loggerServices');
const utils = require('../commands/utils/utils');

const guildsController = require('./guildsController');
const currencyController = require('./currencyController');
const activityController = require('./activityController');
const ticketsController = require('./ticketsController');
const ranksController = require('./ranksController');

const guildsDB = require('../models/GuildModels/guildsDB');
const logSettingsDB = require('../models/GuildModels/guildLogSettingsDB');
const disabledCommandsDB = require('../models/disabledCommandsDB');
const guildSettingsDB = require('../models/GuildModels/guildSettingsDB');

const BackUpCommands = require('../commands/BackUpCommands');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

let PREFIX = '';
const services = {};

/*
    Green Circle Emoji ID: 593998544801628161
    Orange Circle Emoji ID: 593998544868868098
    Red Circle Emojis ID: 593998545363664896
*/


/*
    On Ready
*/
services.handleOnReady = async (bot, getCommands) => {

    getCommands();
    guildsController.checkGuilds(bot)
    activityController.handleActivity(bot);
    setInterval(() => {
        config.Discord_Options.users = 0;
        bot.guilds.array().forEach(el => config.Discord_Options.users += el.memberCount);
    }, 5000);

    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#00ff00')('[LOG]') +'  FiresideBOT Ready');

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff9900).setTitle("Starting up...").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
};

/*
    On Guild Create
*/
services.handleOnGuildCreate = async (bot, guild) => {
    guildsController.saveGuild(bot, guild);

    let embed = new Discord.RichEmbed();
    const channels = guild.channels.array();
    let welcome = { general: null, channels: null };

    embed
    .setColor(0x00ff00)
    .addField(
        'Thank you for adding FiresideBOT <:Fireside:538307773008445440>', 
        'Learn what you can do with `?help` command\n\n' +
        `If you're experiencing any issue please use our [Support Server](https://discord.gg/TqKHVUa)\n\n` +
        `And if FiresideBOT isn't meeting your expectations or you want to just leave a kind message you can tell us with the ` + "`?feedback` command"
    );

    for(let i = 0; i < channels.length; i++) {
        if(channels[i].type !== 'text') continue;
        if(/^.*general.*$/i.test(channels[i].name)) {
            if(!welcome.general || channels[i].position < welcome.general.position)
                welcome.general = channels[i];
        }    
        else if(!welcome.channels || channels[i].position < welcome.channels.position)
            welcome.channels = channels[i];
    }

    welcome.general ? bot.channels.get(welcome.general.id).send(embed) : bot.channels.get(welcome.channels.id).send(embed);
};

services.handleOnGuildUpdate =async (bot, oldGuild, newGuild) => {

};

services.handleOnGuildDelete = async (bot, guild) => guildsController.removeGuild(bot, guild);

services.handleOnMessage = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return ticketsController.handleTicket(bot, message);
    currencyController.handleCurrency(message);
    ranksController.handleXP(bot, message);
    
    let disabledCommands = null;
    let PREFIX = null;
    await guildsDB.findPrefix(message.guild.id)
    .then(prefix => PREFIX = prefix.prefix)
    .catch(err => console.error(err));

    
    await disabledCommandsDB.findByGuildId(message.guild.id)
    .then(dCommands => disabledCommands = dCommands.map(el => el.command))
    .catch(err => console.error(err));

    BackUpCommands(PREFIX, message);

    if(!PREFIX) return;
    if(!message.content.startsWith(PREFIX)) return;
    if(!config.servers.map(el => el.id).includes(message.guild.id)) config.servers.push({ 
        id: message.guild.id,
        queue: {
            isPlaying: false,
            isPaused: false,
            queueInfo: [],
            currentSongInfo: {},
            currentSongEmbed: [],
            genres: [],
            options: {
                volume: '50',
                loop: false,
                recommendations: false,
                voteToSkip: false
            }
        }
    });

    let args = message.content.substring(PREFIX.length).split(" ");
    let server = config.servers[config.servers.map(el => el.id).indexOf(message.guild.id)];
    let options = config.Discord_Options;

    let commandfile = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
    if(commandfile) {
        if(commandfile.config.category === "Admin" && !message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(`You don't have permission to use this command`);
        else if(disabledCommands) {
            if(disabledCommands.includes(commandfile.config.name)) return message.react("❌");
            else commandfile.run(PREFIX, message, args, server, bot, options);
        }
        else commandfile.run(PREFIX, message, args, server, bot, options);
                
        if(process.env.ENVIRONMENT === "DEV") return;
        logger.commandLogger({ 
            command: commandfile.config.d_name.toString(), args: args.join(" "), message: '', discord_id: message.author.id, guild_id: message.guild.id
        });
    } 
};

/*
    On Member Add
*/
services.handleOnMemberAdd = async (bot, member) => {
    if(member.user.bot) return;

    logSettingsDB.findByGuildId(member.guild.id)
    .then(settings => {
        if(!settings) return;

        let embed = new Discord.RichEmbed();
        embed
        .setAuthor(`New Member ${member.user.username}#${member.user.discriminator}`, `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`)
        .setColor(0x00ff00)
        .setFooter(`ID: ${member.user.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};

/*
    On Member Update
*/
services.handleOnMemberUpdate = async (bot, oldMember, newMember) => {

    let audit = await bot.guilds.get(newMember.guild.id).fetchAuditLogs();
    let executor = audit.entries.array()[0].executor;

    logSettingsDB.findByGuildId(newMember.guild.id)
    .then(async settings => {
        if(!settings.enabled) return;

        let embed = new Discord.RichEmbed();
        let updateText = `**${newMember.user.username}** #${newMember.user.discriminator} ${oldMember.nickname ? `(${oldMember.nickname})` : ''}\n\n`;

        if(oldMember.nickname !== newMember.nickname)
            if(!oldMember.nickname) updateText += `**New Nickname**: ${newMember.nickname}\n`;
            else if(newMember.nickname) updateText += `**Nickname Update**: ${newMember.nickname}\n`;
            else if(!newMember.nickname) updateText += `**Nickname Removed**\n`;
        
        if(oldMember._roles.length < newMember._roles.length)
            updateText += `**New Role**: <@&${await utils.arrDifference(oldMember._roles, newMember._roles)}>`;
        else if(oldMember._roles.length > newMember._roles.length)
            updateText += `**Removed Role**: <@&${await utils.arrDifference(oldMember._roles, newMember._roles)}>`;

        embed
        .setAuthor(`Member Updated by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.png?size=2048`)
        .setFooter(`ID: ${newMember.user.id}`)
        .setColor(0xff9900)
        .setDescription(updateText)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};

/*
    On Member Remove
*/
services.handleOnMemberRemove = async (bot, member) => {
    currencyController.removeCurrencyRecord(bot, member);
    if(member.user.bot) return;

    let audit = await bot.guilds.get(member.guild.id).fetchAuditLogs();
    audit = audit.entries.array()[0];

    logSettingsDB.findByGuildId(member.guild.id)
    .then(settings => {
        if(!settings.enabled) return;

        let embed = new Discord.RichEmbed();

        if(audit.action === "MEMBER_KICK") {
            embed
            .setAuthor(
                `Member Kicked by ${audit.executor.username}#${audit.executor.discriminator}`, 
                `https://cdn.discordapp.com/avatars/${audit.executor.id}/${audit.executor.avatar}.png?size=2048`
            )
            if(audit.reason)
                embed.setDescription(`**Reason**: ${audit.reason}`)
        }
        else embed.setTitle(`Member Leave`)

        embed
        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`)
        .setColor(0xff0000)
        .setTitle(`${member.user.username}#${member.user.discriminator}`)
        .setFooter(`ID: ${member.user.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};

/*
    On Role Create
*/
services.handleOnRoleCreate = async (bot, role) => {
    let audit = await bot.guilds.get(role.guild.id).fetchAuditLogs();
    let executor = audit.entries.array()[0].executor;

    logSettingsDB.findByGuildId(role.guild.id)
    .then(settings => {
        if(!settings.enabled) return;

        let embed = new Discord.RichEmbed();

        embed
        .setColor(0x00ff00)
        .setAuthor(`Role Created by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setFooter(`ID: ${role.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};

/*
    On Role Update
*/
services.handleOnRoleUpdate = async (bot, oldRole, newRole) => {
    if(oldRole.name === "@everyone" || newRole.name === "@everyone") return;
    let audit = await bot.guilds.get(newRole.guild.id).fetchAuditLogs();
    let executor = audit.entries.array()[0].executor;

    logSettingsDB.findByGuildId(newRole.guild.id)
    .then(settings => {
        if(!settings.enabled) return;
        
        let infoText = '';

        if(oldRole.color !== newRole.color) infoText += `**Color**: ${newRole.hexColor}\n`;
        if(oldRole.name !== newRole.name) infoText += `**Name**: ${newRole.name}\n`;
        if(oldRole.position !== newRole.position) infoText += `**Position**: ${newRole.position}\n`;
        if(oldRole.mentionable !== newRole.mentionable) infoText += `**Mentionable**: ${newRole.mentionable ? 'Yes' : 'No'}\n`;
        if(oldRole.permissions !== newRole.permissions) infoText += `**Permissions Changed**: Yes \n`;

        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xff9900)
        .setAuthor(`Role Updated by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setDescription(`**Role Name**: ${oldRole.name} \n\n`+ infoText).setFooter(`Role ID: ${newRole.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};

/*
    On Role Delete
*/
services.handleOnRoleDelete = async (bot, role) => {

    let audit = await bot.guilds.get(role.guild.id).fetchAuditLogs();
    let executor = audit.entries.array()[0].executor;

    logSettingsDB.findByGuildId(role.guild.id)
    .then(async settings => {
        if(!settings.enabled) return;

        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xff0000)
        .setAuthor(`Role Deleted by ${executor.username}#${executor.discriminator}`, `https://cdn.discordapp.com/avatars/${executor.id}/${executor.avatar}.png?size=2048`)
        .setDescription(role.name)
        .setFooter(`Role ID: ${role.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    })
};

services.handleOnEmojiCreate = async (bot, emoji) => {

};

services.handleOnEmojiUpdate = (bot, oldEmoji, newEmoji) => {

};

services.handleOnEmojiDelete = async (bot, emoji) => {

};

/*
    On Error
*/
services.handleOnError = async (bot, err) => {
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff0000')('[ERROR]') +' CLIENT ERROR', err);

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("CLIENT ERROR").setFooter(await utils.getDate());

    bot.channels.get("543862697742172179").send(embed);
};

module.exports = services;