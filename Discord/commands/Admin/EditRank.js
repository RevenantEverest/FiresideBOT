const ranksDB = require('../../models/discordRanksDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function updateRank(rank_name, rank, message) {
    ranksDB.update({ id: rank.id, rank_name: rank_name, rank_number: rank.rank_number, guild_id: rank.guild_id })
    .then(() => message.channel.send(`Rank **${rank.rank_name}** updated to **${rank_name}**`))
    .catch(err => errorHandler(bot, message, err, "Error Updating Rank", "EditRank"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a Rank ID and a new rank name");
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid Rank ID");

    let rank_id = args[1];

    args.splice(0, 1);
    args.splice(0, 1);

    ranksDB.findById(rank_id)
    .then(rank => updateRank(args.join(" "), rank, message))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("Invalid ID");
        else errorHandler(message, err, "DB Error", "EditRank");
    })
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