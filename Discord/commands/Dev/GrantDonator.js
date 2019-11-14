const Discord = require('discord.js');
const moment = require('moment');

const guildPremiumController = require('../../controllers/dbControllers/guildPremiumRecordsController');
const userPremiumController = require('../../controllers/dbControllers/userPremiumRecordsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please provide a flag, discord/guild ID, and a desired premium length");
    if(!args[2]) return message.channel.send("Please provide a discord or guild ID");
    if(!args[3]) return message.channel.send("Please specify a premium length");
    if(!Number.isInteger(parseInt(args[3], 10))) return message.channel.send("Please use an integer value to define premium length");

    let premium_id = null;

    if(/<@?(\d+)>/.exec(args.join(" "))) premium_id = /<@?(\d+)>/.exec(args.join(" "))[1];
    else if(/<@!?(\d+)>/.exec(args.join(" "))) premium_id = /<@!?(\d+)>/.exec(args.join(" "))[1];
    else if(Number.isInteger(parseInt(args[2], 10))) premium_id = args[2];

    if(!premium_id) return message.channel.send("Please provide a valid discord or guild ID");

    let end_date = await moment(moment().add(parseInt(args[3], 10), 'd')).format("MMMM Do YYYY");
    let start_date = await moment().format("MMMM Do YYYY");

    if(args.includes("-s")) return guildPremiumController.getByGuildId(bot, message, "GrantDonator", premium_id, handleGuildPremium, () => {
        let data = { guild_id: premium_id, start_date: "", end_date: "", active: true, issued_by: message.author.id };
        guildPremiumController.save(bot, message, "GrantDonator", data, handleGuildPremium);
    });
    else if(args.includes("-u")) return userPremiumController.getByDiscordId(bot, message, "GrantDonator", premium_id, handleUserPremium, () => {
        let data = { discord_id: premium_id, start_date: "", end_date: "", active: true };
        userPremiumController.save(bot, message, "GrantDonator", data, handleUserPremium);
    });
    else return message.channel.send("Please provide a flag");

    async function handleUserPremium(record) {
        let data = { discord_id: record.discord_id, start_date: start_date, end_date: end_date, active: true };
        userPremiumController.update(bot, message, "GrantDonator", data, handleEmbeds);
    };

    async function handleGuildPremium(record) {
        let data = { guild_id: record.guild_id, start_date: start_date, end_date: end_date, active: true, issued_by: message.author.id };
        guildPremiumController.update(bot, message, "GrantDonator", data, handleEmbeds);
    };

    async function handleEmbeds(record) {
        let discordUser = bot.users.get(record.discord_id) || bot.users.get(bot.guilds.get(record.guild_id).ownerID);
        let embed = new Discord.RichEmbed();

        let title = record.guild_id ? `Your Server **${bot.guilds.get(record.guild_id).name}** Has Been Granted Fireside Premium!` : "You Have Been Granted Fireside Premium!";
        embed
        .setColor(0x00ff00)
        .addField(title, `Your premium will end on ${record.end_date}`)

        if(discordUser) discordUser.send(embed);
        message.channel.send("Donator Granted");
        handleLogEmbed(record);
    };

    async function handleLogEmbed(record) {
        let embed = new Discord.RichEmbed();

        embed
        .setColor(0xff33cc)
        .setTitle("New Donator Granted")
        .addField(record.guild_id ? "Guild ID:" : "Discord ID:", record.guild_id ? record.guild_id : record.discord_id, true)
        .addField("Start Date:", record.start_date, true)
        .addField("End Date:", record.end_date, true)
        .setFooter(record.start_date)

        bot.channels.get("624360349700980745").send(embed);
    };
};

module.exports.config = {
    name: 'grantdonator',
    d_name: 'GrantDonator',
    aliases: ['gd'],
    category: 'Dev',
    desc: 'Grants donator perks to a user or server',
    example: 'grantdonator -u @RevenantEverest 100d'
};