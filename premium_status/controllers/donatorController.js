const Discord = require('discord.js');
const bot = require('../Discord_Bot');
const moment = require('moment');

const userPremiumController = require('./dbControllers/userPremiumController');
const guildPremiumController = require('./dbControllers/guildPremiumControler');

module.exports = async (req, res, next) => {
    if(req.body.product_id === process.env.SERVER_PREMIUM_PRODUCT_ID)
        // Handle Server Premium here, potentially create redeemable codes
        return;
        // return guildPremiumController.getByGuildId(req.body.guild_id, handleGuildPremium, () => {
        //     let data = { guild_id: "", start_date: "", end_date: "", active: true, issued_by: req.body.buyer_id };
        // });
    else if(req.body.product_id === process.env.USER_PREMIUM_PRODUCT_ID)
        return userPremiumController.getByDiscordId(req.body.buyer_id, handleUserPremium, () => {
            let data = { discord_id: req.body.buyer_id, start_date: "", end_date: "", active: true };
            userPremiumController.save(data, handleUserPremium);
        });

    async function handleUserPremium(record) {
        let end_date = moment(moment().add(30, 'd')).format("YYYY-MM-DD");
        let start_date = moment().format("YYYY-MM-DD");
        let data = { discord_id: record.discord_id, start_date: start_date, end_date: end_date, active: true };
        userPremiumController.update(data, handleEmbeds);
    };

    async function handleEmbeds(record) {
        let discordUser = bot.users.get(record.discord_id);
        let userEmbed = new Discord.RichEmbed();
        let logEmbed = new Discord.RichEmbed();

        userEmbed
        .setColor(0x00ff00)
        .addField("Thank You For Purchasing Fireside Premium!", `Your premium will end on ${moment(record.end_date).format("MMM Do YYYY")}`)

        logEmbed
        .setColor(0xff33cc)
        .setTitle("New Donator")
        .addField('Discord ID:', record.discord_id, true)
        .addField('Price:', `${req.body.price} ${req.body.currency}`, true)
        .addField('Recurring:', req.body.recurring, true)
        .setFooter(record.start_date)

        if(discordUser) discordUser.send(userEmbed);
        bot.channels.get("624360349700980745").send(logEmbed);
    };
};