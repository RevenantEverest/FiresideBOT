const Discord = require('discord.js');
const moment = require('moment');

const userPremiumController = require('../../controllers/dbControllers/userPremiumRecordsController');
const guildPremiumController = require('../../controllers/dbControllers/guildPremiumRecordsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(args.includes("-s"))
        return guildPremiumController.getByGuildId(bot, message, "PremiumStatus", message.guild.id, handleGuildPremium, () => {
            return message.channel.send("No Premium Record Found");
        });
    else return userPremiumController.getByDiscordId(bot, message, "PremiumStatus", message.author.id, handleUserPremium, () => {
            return message.channel.send("No Premium Record Found");
        });

    async function handleUserPremium(record) {
        let isActive = moment(record.start_date).to(record.end_date).split(" ").includes("ago") ? false : true;
        let embed = new Discord.MessageEmbed();
        embed
        .setColor(isActive ? 0x00ff00 : 0xff0000)
        .setAuthor(`Premium Status for ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL({ dynamic: true }))
        .addField("Start Date:", moment(record.start_date).format("MMMM Do YYYY"), true)
        .addField("End Date:", moment(record.end_date).format("MMMM Do YYYY"), true)
        .addField("Active:", isActive ? "Yes" : "No")
        .setFooter(`User ID: ${message.author.id}`)

        message.channel.send(embed);
    };

    async function handleGuildPremium(record) {
        let isActive = moment(record.start_date).to(record.end_date).split(" ").includes("ago") ? false : true;
        let issuedBy = bot.users.resolve(record.issued_by);
        let embed = new Discord.MessageEmbed();
        embed
        .setColor(isActive ? 0x00ff00 : 0xff0000)
        .setAuthor(`Premium Status for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
        .addField("Start Date:", moment(record.start_date).format("MMMM Do YYYY"), true)
        .addField("End Date:", moment(record.end_date).format("MMMM Do YYYY"), true)
        .addField("Active:", isActive ? "Yes" : "No")
        .addField("Issued By:", issuedBy ? `${issuedBy.username}#${issuedBy.discriminator}` : "Non Fireside User")
        .setFooter(`Guild ID: ${message.guild.id}`)

        message.channel.send(embed);
    };
};

module.exports.config = {
    name: 'premiumstatus',
    d_name: 'PremiumStatus',
    aliases: ['ps'],
    params: { required: false, params: "Flag" },
    flags: ['-s'],
    category: 'Info',
    desc: 'Check your premium status',
    example: 'premiumstatus'
};