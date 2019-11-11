const guildSettingsController = require('../../controllers/dbControllers/guildSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.voiceChannel) return message.channel.send('Please join a voice channel');
    if(args[0] === "PlaySong") return handleQueueVolume(bot, message, server);

    if(!args[1]) return message.channel.send(`Current Volume: **${server.queue.options.volume}**`);
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid integer value.");
    if(parseInt(args[1], 10) > 100 || parseInt(args[1], 10) <= 0) return message.channel.send("Please select a volume between 1 and 100.");

    let volume = parseInt(args[1], 10);
    server.queue.options.volume = volume;

    if(server.dispatcher) server.dispatcher.setVolume(server.queue.options.volume / 100);

    guildSettingsController.getByGuildId(bot, message, "Volume", message.guild.id, updateVolume, () => {
        let data = { guild_id: message.guild.id, prefix: "?", volume: 50 };
        guildSettingsController.save(bot, message, "EditPrefix", data, updateSettings);
    });

    async function updateVolume(settings) {
        let data = { guild_id: message.guild.id, prefix: settings.prefix, volume: volume };
        guildSettingsController.update(bot, message, "Volume", data, (newSettings) => {
            return message.channel.send(`Volume set to: **${newSettings.volume}**`);
        });
    };

    async function handleQueueVolume() {
        guildSettingsController.getByGuildId(bot, message, "Volume")
    };
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