const Discord = require('discord.js');
const db = require('../../models/discordRanksDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function updateRankNumbers(rank, message) {
    db.findByGuildId(rank.guild_id)
    .then(ranks => {
        let rankData = [];
        let promises = [];
        
        ranks.forEach((el, idx) => rankData.push({ id: el.id, guild_id: el.guild_id, rank_name: el.rank_name, rank_number: (idx + 1) }));
        rankData.forEach(el => promises.push(db.update(el)));

        Promise.all(promises)
        .then(() => message.channel.send(`Rank **${rank.rank_name}** removed`))
        .catch(err => {
            message.channel.send("Error Updating Ranks");
            console.error(err);
        });
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send(`Rank **${rank.rank_name}** deleted`);
        else console.error(err);
    });
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You don't have permission to use this command`);
    if(!args[1]) return message.channel.send("Please specify a Rank ID");
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid ID");
    
    let rank_id = parseInt(args[1], 10);
    db.findById(rank_id)
    .then(rank => {
        if(rank.guild_id !== message.guild.id) return message.channel.send("Invalid ID");

        db.delete(rank_id)
        .then(rank => updateRankNumbers(rank, message))
        .catch(err => {
            message.channel.send("Error deleting rank");
            console.error(err);
        });
    })
    .catch(err => {
        message.channel.send("Invalid ID");
        console.error(err);
    })
    
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