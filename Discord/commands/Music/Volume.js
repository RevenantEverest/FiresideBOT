const guildsDB = require('../../models/GuildModels/guildsDB');
const errorHandler = require('../../controllers/errorHandler');

async function updateVolume(bot, message, volume, settings) {
  guildsDB.updateSettings({ guild_id: message.guild.id, prefix: settings.prefix, volume: volume })
  .then(() => message.channel.send(`Volume set to: **${volume}**`))
  .catch(err => errorHandler(bot, message, err, "Error Updating Volume", "Volume"));
};

async function handleQueueVolume(bot, message, server) {
  if(server.queue.options.volume) 
    return server.dispatcher.setVolume(server.queue.options.volume / 100)
  
  guildsDB.findSettings(message.guild.id)
  .then(settings => {
    server.queue.options.volume = settings.volume;
    server.dispatcher.setVolume(settings.volume / 100);
  })
  .catch(err => errorHandler(bot, message, err, "Error Finding Volume", "Volume"))
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.voiceChannel) return message.channel.send('Please join a voice channel');
    if(args[0] === "PlaySong") return handleQueueVolume(bot, message, server);

    if(!args[1]) return message.channel.send(`Current Volume: **${server.queue.options.volume}**`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid integer value.");
    if(parseInt(args[1], 10) > 100 || parseInt(args[1], 10) <= 0) return message.channel.send("Please select a volume between 1 and 100.");

    server.queue.options.volume = parseInt(args[1], 10);

    if(server.dispatcher) server.dispatcher.setVolume(server.queue.options.volume / 100);

    guildsDB.findSettings(message.guild.id)
    .then(settings => updateVolume(bot, message, parseInt(args[1], 10), settings))
    .catch(err => errorHandler(bot, message, err, "Error Finding Volume", "Volume"));
};

module.exports.config = {
    name: 'volume',
    d_name: 'Volume',
    aliases: ['vol'],
    params: { required: false, params: 'Number' },
    category: 'Music',
    desc: 'Displays current volume or sets volume',
    example: 'volume 20'
};