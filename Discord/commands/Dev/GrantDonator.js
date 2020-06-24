const Discord = require('discord.js');
const moment = require('moment');

const guildPremiumController = require('../../controllers/dbControllers/guildPremiumRecordsController');
const userPremiumController = require('../../controllers/dbControllers/userPremiumRecordsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;
    
    if(!args[1]) return message.channel.send("Please provide a flag, discord/guild ID, and a desired premium length");
    if(!args[2]) return message.channel.send("Please provide a discord or guild ID");

    let premium_id = null;
    let premium_length = args.includes("-s") ? args[3] : args[2];

    if(!Number.isInteger(parseInt(premium_length, 10)) || !premium_length)
        return message.channel.send("Please use an integer value to define premium length");

    if(/<@?(\d+)>/.exec(args.join(" "))) premium_id = /<@?(\d+)>/.exec(args.join(" "))[1];
    else if(/<@!?(\d+)>/.exec(args.join(" "))) premium_id = /<@!?(\d+)>/.exec(args.join(" "))[1];
    else if(Number.isInteger(parseInt(args[1], 10))) premium_id = args[1];
    else if(Number.isInteger(parseInt(args[2], 10))) premium_id = args[2];

    if(!premium_id) return message.channel.send("Please provide a valid discord or guild ID");

    let end_date = moment(moment().add(parseInt(premium_length, 10), 'd')).format("YYYY-MM-DD");
    let start_date = moment().format("YYYY-MM-DD");

    if(args.includes("-s")) 
        return guildPremiumController.getByGuildId(bot, message, "GrantDonator", premium_id, handleGuildPremium, () => {
            let data = { guild_id: premium_id, start_date: "", end_date: "", active: true, issued_by: message.author.id };
            guildPremiumController.save(bot, message, "GrantDonator", data, handleGuildPremium);
        });
    else 
        return userPremiumController.getByDiscordId(bot, message, "GrantDonator", premium_id, handleUserPremium, () => {
            let data = { discord_id: premium_id, start_date: "", end_date: "", active: true };
            userPremiumController.save(bot, message, "GrantDonator", data, handleUserPremium);
        });

    async function handleUserPremium(record) {
        let isActive = moment(start_date).to(end_date).split(" ").includes("ago") ? false : true;
        let data = { discord_id: record.discord_id, start_date: start_date, end_date: end_date, active: isActive };
        userPremiumController.update(bot, message, "GrantDonator", data, handleUserEmbed);
    };

    async function handleGuildPremium(record) {
        let isActive = moment(start_date).to(end_date).split(" ").includes("ago") ? false : true;
        let data = { guild_id: record.guild_id, start_date: start_date, end_date: end_date, active: isActive, issued_by: message.author.id };
        guildPremiumController.update(bot, message, "GrantDonator", data, handleGuildEmbed);
    };

    async function handleUserEmbed(record) {
        let discordUser = bot.users.resolve(record.discord_id);
        let embed = new Discord.MessageEmbed();

        embed
        .setColor(0x00ff00)
        .setTitle("You Have Been Granted Fireside Premium!")
        .setDescription(`Your premium will end on ${moment(record.end_date).format("MMMM Do YYYY")}`)

        if(discordUser) discordUser.send(embed);
        message.channel.send("Donator Status Granted");
        handleLogEmbed(record);
    };

    async function handleGuildEmbed(record) {
        let guild =  bot.guilds.resolve(record.guild_id);
        let channels = guild.channels.cache.array();
        let notification = { general: null, channels: null };
        let embed = new Discord.MessageEmbed();

        embed
        .setColor(0x00ff00)
        .setTitle(`Your Server Has Been Granted Fireside Premium!`)
        .setDescription(`Your premium will end on ${moment(record.end_date).format("MMMM Do YYYY")}`);

        for(let i = 0; i < channels.length; i++) {
            if(channels[i].type !== 'text') continue;
            if(/^.*general.*$/i.test(channels[i].name)) {
                if(!notification.general || channels[i].position < notification.general.position)
                    notification.general = channels[i];
            }    
            else if(!notification.channels || channels[i].position < notification.channels.position)
                notification.channels = channels[i];
        }
    
        notification.general ? bot.channels.resolve(notification.general.id).send(embed) : bot.channels.resolve(notification.channels.id).send(embed);
        message.channel.send("Server Donator Status Granted");
        handleLogEmbed(record);
    };

    async function handleLogEmbed(record) {
        let embed = new Discord.MessageEmbed();

        embed
        .setColor(0xff33cc)
        .setTitle(`New ${record.guild_id ? "Server " : ""}Donator Granted`)
        .addField(record.guild_id ? "Guild ID:" : "Discord ID:", record.guild_id ? record.guild_id : record.discord_id, true)
        .addField("Start Date:", moment(record.start_date).format("MMMM Do YYYY"), true)
        .addField("End Date:", moment(record.end_date).format("MMMM Do YYYY"), true)
        .setFooter(`Granted By: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))

        bot.channels.resolve("543862697742172179").send(embed);
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