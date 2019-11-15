const ranksController = require('../../controllers/dbControllers/ranksController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a desired rank name");
    args.splice(0, 1);

    ranksController.getByGuildId(bot, message, "AddRank", message.guild.id, handleRank, () => handleRank([]));

    async function handleRank(ranks) {
        if(ranks.length >= 20) return message.channel.send("Ranks limited to 20");
        let data = { guild_id: message.guild.id, rank_name: args.join(" "), rank_number: (ranks.length + 1) };
        ranksController.save(bot, message, "AddRank", data, (newRank) => {
            return message.channel.send(`New Rank **${newRank.rank_name}** added with ID: **${newRank.id}** in position **${newRank.rank_number}**`)
        });
    };
};

module.exports.config = {
    name: 'addrank',
    d_name: 'AddRank',
    aliases: ['nr', 'cr'],
    params: { required: true, params: 'Rank Name' },
    category: 'Admin',
    desc: 'Creates a new Rank Tier',
    example: 'addrank NewRank'
};