const ranksController = require('../../controllers/dbControllers/ranksController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a Rank ID and a new rank name");
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid Rank ID");

    let rank_id = args[1];

    args.splice(0, 1);
    args.splice(0, 1);

    ranksController.getOne(bot, message, "EditRank", rank_id, updateRank, () => {
        return message.channel.send("Rank Not Found");
    });

    async function updateRank(rank) {
        if(rank.guild_id !== message.guild.id) return message.channel.send("Rank Not Found");
        let data = { id: rank.id, rank_name: args.join(" "), rank_number: rank.rank_number, guild_id: rank.guild_id };
        ranksController.update(bot, message, "EditRank", data, (newRank) => {
            return message.channel.send(`Rank **${rank.rank_name}** updated to **${newRank.rank_name}**`);
        });
    };
};

module.exports.config = {
    name: 'editrank',
    d_name: 'EditRank',
    aliases: ['er'],
    params: { required: true, params: 'Rank ID and new Rank name' },
    category: 'Admin',
    desc: 'Change a ranks name',
    example: 'editrank 92 NewRankName'
};