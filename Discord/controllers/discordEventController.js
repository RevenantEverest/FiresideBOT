const config = require('../../config/config');
const Discord = require('discord.js');
const logger = require('../services/loggerServices');

const guildsController = require('./guildsController');
const currencyController = require('./currencyController');
const userSizeController = require('./userSizeController');
const activityController = require('./activityController');

const guildsDB = require('../../models/GuildModels/guildsDB');

const BackUpCommands = require('../commands/BackUpCommands');
const checkString = require('../commands/utils/checkString');

let PREFIX = '';
const services = {};



services.handleOnReady = async (bot) => {
    guildsController.checkGuilds(bot)
    activityController.handleActivity(bot);
    setInterval(() => {
        userSizeController.getUserSize(bot)
    }, 5000);
};

services.handleOnGuildCreate = async (bot, guild) => {
    guildsController.saveGuild(bot, guild);

    let embed = new Discord.RichEmbed();
    const channels = guild.channels.array();
    let welcome = { general: null, channels: null };

    embed
    .setColor(0x00ff00)
    .addField(
        'Thank you for adding FiresideBOT', 
        'Learn what you can do with `?help` command\n\n' +
        `If you're experiencing any issue please use our [Support Server](https://discord.gg/TqKHVUa)\n\n` +
        `And if FiresideBOT isn't meeting your expectations or you want to just leave a kind message you can tell us with the ` + "`?feedback` command"
    )

    for(let i = 0; i < channels.length; i++) {
        if(channels[i].type === 'text') {
            if(/^.*general.*$/i.test(channels[i].name) && channels[i].type === 'text')

                if(!welcome.general || channels[i].position < welcome.general.position)
                    welcome.general = channels[i];

            else if(!welcome.channels || channels[i].position < welcome.channels.position)
                welcome.channels = channels[i];
        }
    }

    welcome.general ? bot.channels.get(welcome.general.id).send(embed) : bot.channels.get(welcome.channels.id);
    
    /* Guild Logger */
    // logger.guildLogger({ guild_id: guild.id, guild_name: guild.name, message: 'Guild Added'});
};

services.handleOnGuildDelete = async (bot, guild) => {
    guildsController.removeGuild(bot, guild);

    /* Guild Logger */
    // logger.guildLogger({ guild_id: guild.id, guild_name: guild.name, message: 'Guild Removed'})
};

services.handleOnMessage = async (bot, message) => {
    if(message.author.bot || message.channel.type === 'dm') return;
        currencyController.handleCurrency(message);
        
        guildsDB.findPrefix(message.guild.id)
            .then(prefix => {
                PREFIX = prefix.prefix;

                BackUpCommands(PREFIX, message);

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
                            recommendations: false
                        }
                    }
                 });

                let args = message.content.substring(PREFIX.length).split(" ");
                let server = config.servers[config.servers.map(el => el.id).indexOf(message.guild.id)];

                let commandfile = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
                if(commandfile) {
                    commandfile.run(PREFIX, message, args, server, bot);
                    // logger.commandLogger({ 
                    //     command: commandfile.config.d_name.toString(), args: args.join(" "), message: '', user_id: message.author.id, guild_id: message.guild.id
                    // });
                }
            
            })
            .catch(err => console.error(err));
};

services.handleOnError = async (bot, err) => {

};

module.exports = services;