const rankSettingsController = require('../../controllers/dbControllers/rankSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please tag a channel you'd like Level Ups posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like the tracker to post in");

    rankSettingsController.getByGuildId(bot, message, "EditRankChannel", message.guild.id, updateSettings, () => {
        let data = { guild_id: message.guild.id, general_increase_rate: 10, complexity: 2, channel_id: "none" };
        rankSettingsController.save(bot, message, "EditRankChannel", data, updateSettings);
    });

    async function updateSettings(settings) {
        let data = { guild_id: message.guild.id, general_increase_rate: settings.general_increase_rate, complexity: settings.complexity, channel_id: channel_id };
        rankSettingsController.update(bot, message, "EditRankChannel", data, (newSettings) => {
            return message.channel.send(`Level Ups will now be posted in <#${newSettings.channel_id}>`);
        });
    };
};

module.exports.config = {
    name: 'editrankchannel',
    d_name: 'EditRankChannel',
    aliases: ['ercp'],
    params: { required: true, params: '#Channel Tag' },
    category: 'Config',
    desc: 'Update the channel Level Ups are posted in',
    example: 'editrank #bot-commands'
};