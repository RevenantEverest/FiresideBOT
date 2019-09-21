const config = require('../../config/config');
const logger = require('../../services/loggerServices');

const currencyController = require('../currencyController');
const ticketsController = require('../ticketsController');
const ranksController = require('../ranksController');

const guildsDB = require('../../models/GuildModels/guildsDB');
const disabledCommandsDB = require('../../models/disabledCommandsDB');

const BackUpCommands = require('../../commands/BackUpCommands');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = async (bot, message) => {
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
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return;
        else console.error(err);
    });
    
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
                volume: null,
                loop: false,
                recommendations: false,
                voteToSkip: false
            }
        }
    });
    
    let args = message.content.substring(PREFIX.length).split(" ");
    let server = config.servers[config.servers.map(el => el.id).indexOf(message.guild.id)];
    let options = config.environment;
    
    let commandfile = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));

    if(!commandfile) return;
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