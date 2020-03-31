const config = require('../../config/config');
const { Permissions } = require('discord.js');
const logger = require('../../services/loggerServices');

const ticketsController = require('../ticketsController');
const customCommandParser = require('../customCommandParser');

const guildSettingsDB = require('../../models/GuildModels/guildSettingsDB');
const disabledCommandsDB = require('../../models/disabledCommandsDB');
const customCommandsDB = require('../../models/customCommandsDB');
const userPremiumRecordsDB = require('../../models/UserModels/userPremiumRecordsDB');
const guildPremiumRecordsDB = require('../../models/GuildModels/guildPremiumRecordsDB');

const BackUpCommands = require('../../commands/BackUpCommands');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function checkCustomCommands(bot, message, args) {
    customCommandsDB.findByGuildIdAndInput({ guild_id: message.guild.id, input: args[0].toLowerCase() })
    .then(customCommand => customCommandParser(bot, message, customCommand))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
};

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return ticketsController.handleTicket(bot, message);

    let permissions = new Permissions(message.channel.permissionsFor(bot.user).bitfield);
    if(!permissions.has("SEND_MESSAGES") || !permissions.has("EMBED_LINKS")) return;

    let PREFIX = null;
    let VOLUME = null;
    
    await guildSettingsDB.findByGuildId(message.guild.id)
    .then(settings => {
        PREFIX = settings.prefix;
        VOLUME = settings.volume;
    })
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
                volume: VOLUME,
                loop: false,
                recommendations: false,
                voteToSkip: false
            }
        },
        premium: false
    });
    
    let args = message.content.substring(PREFIX.length).split(" ");
    let server = config.servers[config.servers.map(el => el.id).indexOf(message.guild.id)];
    let options = config.environment;
    let disabledCommands = null;
    let userstate = {};

    await disabledCommandsDB.findByGuildId(message.guild.id)
    .then(dCommands => disabledCommands = dCommands.map(el => el.command))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });

    await userPremiumRecordsDB.findByDiscordId(message.author.id)
    .then(record => userstate.premium = record.active)
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });

    await guildPremiumRecordsDB.findByGuildId(message.guild.id)
    .then(record => server.premium = record.active)
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
    
    let commandfile = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));

    if(!commandfile) return checkCustomCommands(bot, message, args);
    if(commandfile.config.category === "Admin" && !message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send(`You don't have permission to use this command`);
    else if(disabledCommands) {
        if(disabledCommands.includes(commandfile.config.name)) return message.react("❌");
        else commandfile.run(PREFIX, message, args, server, bot, options, userstate);
    }
    else commandfile.run(PREFIX, message, args, server, bot, options, userstate);
                    
    if(process.env.ENVIRONMENT === "DEV") return;
    logger.commandLogger({ 
        command: commandfile.config.d_name.toString(), args: args.join(" "), message: '', discord_id: message.author.id, guild_id: message.guild.id
    });
};