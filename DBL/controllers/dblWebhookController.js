const Discord = require('discord.js');
const utils = require('../utils/utils');
const colors = [0xffcc00, 0x00ff00, 0xff0066, 0xcc66ff, 0x1affff, 0x009900, 0xcc6699, 0xff6600];
const Discord_Bot = require('../Discord_Bot');

const voteLogsController = require('../controllers/dbControllers/voteLogsController');
const voteRecordsController = require('../controllers/dbControllers/voteRecordsController');

module.exports = {
    async handleVote(req, res, next) {
        let date = await utils.getDate();

        voteRecordsController.getByDiscordId(req.body.user, updateVoteRecord, () => {
            voteRecordsController.save({ discord_id: req.body.user, amount: 1, date: date }, logVote);
        });

        async function updateVoteRecord(record) {
            let data = { id: record.id, discord_id: record.discord_id, amount: (parseInt(record.amount, 10) + 1), date: date };
            voteRecordsController.update(data, logVote);
        };

        async function logVote() {
            voteLogsController.save({ discord_id: req.body.user, date: date }, sendEmbeds)
        };

        async function sendEmbeds() {
            let discordUser = Discord_Bot.users.get(req.body.user);
            
            let voteEmbed = new Discord.RichEmbed();
            let logEmbed = new Discord.RichEmbed();

            voteEmbed
            .addField('**Vote Received**', 'Thank you for your vote!')
            .setColor(0xffcc00)

            logEmbed
            .setColor(colors[Math.floor(Math.random() * colors.length)])
            .addField("Vote Received", `ID: ${req.body.user}`)
            .setFooter(date)

            if(discordUser) Discord_Bot.users.get(req.body.user).send(voteEmbed);
            Discord_Bot.channels.get("539303187342032896").send(logEmbed);
        };
    }
};