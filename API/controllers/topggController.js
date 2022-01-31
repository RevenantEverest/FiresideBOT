const Discord = require('discord.js');
const bot = require('../Discord_Bot');
const voteLogsController = require('../controllers/dbControllers/voteLogsController');
const voteRecordsController = require('../controllers/dbControllers/voteRecordsController');
const { dateUtils } = require('../utils');
const colors = [0xffcc00, 0x00ff00, 0xff0066, 0xcc66ff, 0x1affff, 0x009900, 0xcc6699, 0xff6600];

const services = {};

services.handleWebhook = async (vote) => {
    console.log("Vote Received", vote);

    let date = await dateUtils.getDate();

    voteRecordsController.getByDiscordId(vote.user, updateVoteRecord, () => {
        voteRecordsController.save({ discord_id: vote.user, amount: 1, date: date }, logVote);
    });

    async function updateVoteRecord(record) {
        let data = { id: record.id, discord_id: record.discord_id, amount: (parseInt(record.amount, 10) + 1), date: date };
        voteRecordsController.update(data, logVote);
    };

    async function logVote() {
        voteLogsController.save({ discord_id: vote.user, date: date }, sendEmbeds)
    };

    async function sendEmbeds() {
        let discordUser = await bot.users.fetch(vote.user);
        
        let voteEmbed = new Discord.MessageEmbed();
        let logEmbed = new Discord.MessageEmbed();

        voteEmbed
        .addField('**Vote Received**', 'Thank you for your vote!')
        .setColor(0xffcc00)

        logEmbed
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .addField("Vote Received", `ID: ${vote.user}`)
        .setFooter(date)

        if(discordUser) discordUser.send(voteEmbed);

        bot.channels.resolve(process.env.ENVIRONMENT === "DEV" ? "427883469092159492" : "539303187342032896").send(logEmbed);
    };
};

module.exports = services;