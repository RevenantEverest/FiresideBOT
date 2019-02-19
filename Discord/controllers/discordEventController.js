const config = require('../../config/config');
const logger = require('../services/loggerServices');

const guildsController = require('./guildsController');
const currencyController = require('./currencyController');
const userSizeController = require('./userSizeController');
const activityController = require('./activityController');

const guildsDB = require('../../models/GuildModels/guildsDB');

const BackUpCommands = require('../commands/BackUpCommands');

let PREFIX = '';

module.exports = {
    /* Called from the On Ready Event */
    handleOnReady(bot) {
        guildsController.checkGuilds(bot)
        activityController.handleActivity(bot);
        setInterval(() => {
          userSizeController.getUserSize(bot)
        }, 5000);
    },
    /* Called from the On Message Event */
    handleOnMessage(bot, message) {
        if(message.author.bot || message.channel.type === 'dm') return;
        currencyController.handleCurrency(message);
        
        guildsDB.findPrefix(message.guild.id)
            .then(prefix => {
                PREFIX = prefix.prefix;

                BackUpCommands(PREFIX, message);

                if(!message.content.startsWith(PREFIX)) return;
                if(!config.servers[message.guild.id]) config.servers[message.guild.id] = {
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
                            recommendations: false
                        }
                    }
                };

                let args = message.content.substring(PREFIX.length).split(" ");
                let server = config.servers[message.guild.id];

                let commandfile = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
                if(commandfile) {
                    commandfile.run(PREFIX, message, args, server, bot);
                    // logger.commandLogger({ command: commandfile.config.d_name.toString(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id });
                }
            
            })
            .catch(err => console.log(err));
    },
    /* Called from the On Error Event */
    handleOnError(bot, err) {
        /* 
            Log Error        
        */
    }
}