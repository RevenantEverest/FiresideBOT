const ranksController = require('../../controllers/dbControllers/ranksController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a Rank ID");
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid ID");
    
    let rank_id = parseInt(args[1], 10);

    ranksController.getOne(bot, message, "RemoveRank", rank_id, deleteRank, () => {
        return message.channel.send("No Rank Found");
    });

    async function deleteRank(rank) {
        if(rank.guild_id !== message.guild.id) return message.channel.send("No Rank Found");
        ranksController.delete(bot, message, "RemoveRank", rank_id, () => {
            ranksController.getByGuildId(bot, message, "RemoveRank", message.guild.id, (ranks) => updateRankNumbers(rank, ranks), () => {
                return message.channel.send(`Rank **${rank.rank_name}** removed`);;
            });
        });
    };

    async function updateRankNumbers(deletedRank, ranks) {
        let rankData = [];
        ranks.forEach((el, idx) => rankData.push({ id: el.id, guild_id: el.guild_id, rank_name: el.rank_name, rank_number: (idx + 1) }));
        rankData.forEach((el, idx) => {
            ranksController.update(bot, message, "RemoveRank", el, () => {
                if((idx + 1) === rankData.length) return message.channel.send(`Rank **${deletedRank.rank_name}** removed`); 
            });
        });
    };
};

module.exports.config = {
    name: 'removerank',
    d_name: 'RemoveRank',
    aliases: ['rr'],
    params: { required: true, params: 'Rank ID' },
    category: 'Admin',
    desc: 'Removes a Rank Tier',
    example: 'removerank 10'
};