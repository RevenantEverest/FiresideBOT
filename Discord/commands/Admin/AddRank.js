const Discord = require('discord.js');
const db = require('../../models/discordRanksDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function saveRank(rank, message) {
    db.save(rank)
    .then(rank => message.channel.send(`New Rank **${rank.rank_name}** added with ID: **${rank.id}** in position **${rank.rank_number}**`))
    .catch(err => {
        message.channel.send("Error Saving Rank");
        console.error(err);
    })
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
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
        else {
            message.channel.send("Error Finding Rank Number");
            console.error(err);
        };
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