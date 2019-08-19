const Discord = require('discord.js');
const db = require('../../models/discordRanksDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function saveRank(rank, message) {
    db.save(rank)
    .then(rank => message.channel.send(`New Rank **${rank.rank_name}** added with ID: **${rank.id}** in position **${rank.rank_number}**`))
    .catch(err => errorHandler(bot, message, err, "Error Saving Rank", "AddRank"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a desired rank name");
    args.splice(0, 1);

    db.findByGuildId(message.guild.id)
    .then(ranks => {
        if(ranks.length >= 20) return message.channel.send("Ranks limited to 20");
        saveRank({ guild_id: message.guild.id, rank_name: args.join(" "), rank_number: (ranks.length + 1) }, message);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            saveRank({ guild_id: message.guild.id, rank_name: args.join(" "), rank_number: 1 }, message)
        else errorHandler(bot, message, err, "Error Finding Rank Number", "AddRak");
    });
};

module.exports.config = {
    name: 'addrank',
    d_name: 'AddRank',
    aliases: ['ar'],
    params: { required: true, params: 'Rank Name' },
    category: 'Admin',
    desc: 'Creates a new Rank Tier',
    example: 'addrank NewRank'
};