const Discord = require('discord.js');
const moment = require('moment');

const userPremiumController = require('../../controllers/dbControllers/userPremiumRecordsController');
const guildPremiumController = require('../../controllers/dbControllers/guildPremiumRecordsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please provide a flag, discord/guild ID, and an optional reason for premium revocation");

    let premium_id = null;

    if(/<@?(\d+)>/.exec(args.join(" "))) premium_id = /<@?(\d+)>/.exec(args.join(" "))[1];
    else if(/<@!?(\d+)>/.exec(args.join(" "))) premium_id = /<@!?(\d+)>/.exec(args.join(" "))[1];
    else if(args.includes("-s") && Number.isInteger(parseInt(args[2], 10))) premium_id = args[2];
    else if (Number.isInteger(parseInt(args[1], 10))) premium_id = args[1];

    if(!premium_id) return message.channel.send("Please provide a valid discord or guild ID");

    let end_date = moment().format("YYYY-MM-DD");
    let reason = null;

    if(args[3]) {
        let re = /(?<=\s)(-[a-z0-9]+)([^\-]*)?/gi;
        var m = re.exec(args.join(" "));

        while(m != null) {
            if(m[1] === "-r") {
                if(!m[2]) return message.channel.send("Please Provide A Reason");
                reason = m[2].replace(/^\s+|\s+$/g, '');
            }
            m = re.exec(message);
        }
    }

    if(args.includes("-s")) 
        return guildPremiumController.getByGuildId(bot, message, "GrantDonator", premium_id, handleGuildPremium, () => {
            return message.channel.send("No Premium Record Found");
        });
    else 
        return userPremiumController.getByDiscordId(bot, message, "GrantDonator", premium_id, handleUserPremium, () => {
            return message.channel.send("No Premium Record Found");
        });

    async function handleUserPremium(record) {
        let isActive = moment(record.start_date).to(record.end_date).split(" ").includes("ago") ? false : true;
        console.log(isActive, record.active)
        if(!isActive || !record.active) return message.channel.send("User's premium has already ended");
        let data = { discord_id: record.discord_id, start_date: record.start_date, end_date: end_date, active: false };
        userPremiumController.update(bot, message, "GrantDonator", data, handleUserEmbed);
    };

    async function handleGuildPremium(record) {
        let isActive = moment(record.start_date).to(record.end_date).split(" ").includes("ago") ? false : true;
        if(!isActive || !record.active) return message.channel.send("Server's premium has already ended");
        let data = { guild_id: record.guild_id, start_date: record.start_date, end_date: end_date, active: false, issued_by: message.author.id };
        guildPremiumController.update(bot, message, "GrantDonator", data, handleGuildEmbed);
    };

    async function handleUserEmbed(record) {
        let discordUser = bot.users.get(record.discord_id);
        let embed = new Discord.RichEmbed();

        embed
        .setColor(0xff0000)
        .addField("Your Fireside Premium Has Been Revoked", `**Reason**: ${reason ? reason : "No Reason Given"}`)
        .setFooter(`If you think is a mistake, please message Fireside directly to open a ticket`);

        if(discordUser) discordUser.send(embed);
        message.channel.send("Donator Status Revoked");
        handleLogEmbed(record);
    };

    async function handleGuildEmbed(record) {
        let guild =  bot.guilds.get(record.guild_id);
        let channels = guild.channels.array();
        let notification = { general: null, channels: null };
        let embed = new Discord.RichEmbed();

        embed
        .setColor(0xff0000)
        .addField("Your Server's Fireside Premium Has Been Revoked", `**Reason**: ${reason ? reason : "No Reason Given"}`)
        .setFooter(`If you think is a mistake, please message Fireside directly to open a ticket`);

        for(let i = 0; i < channels.length; i++) {
            if(channels[i].type !== 'text') continue;
            if(/^.*general.*$/i.test(channels[i].name)) {
                if(!notification.general || channels[i].position < notification.general.position)
                    notification.general = channels[i];
            }    
            else if(!notification.channels || channels[i].position < notification.channels.position)
                notification.channels = channels[i];
        }
    
        notification.general ? bot.channels.get(notification.general.id).send(embed) : bot.channels.get(notification.channels.id).send(embed);
        message.channel.send("Server Donator Status Revoked");
        handleLogEmbed(record);
    };

    async function handleLogEmbed(record) {
        let embed = new Discord.RichEmbed();

        embed
        .setColor(0xff9900)
        .setTitle("Donator Privilages Revoked")
        .addField(record.guild_id ? "Guild ID:" : "Discord ID:", record.guild_id ? record.guild_id : record.discord_id, true)
        .addField("Start Date:", moment(record.start_date).format("MMMM Do YYYY"), true)
        .addField("End Date:", moment(record.end_date).format("MMMM Do YYYY"), true)
        .setFooter(`Revoked By: ${message.author.username}`, message.author.avatarURL)

        bot.channels.get("624360349700980745").send(embed);
    };
};

module.exports.config = {
    name: 'revokepremium',
    d_name: 'PrevokePremium',
    aliases: ['rp'],
    params: { required: true, params: 'Flag, Discord/Guild ID, Optional Reason' },
    flags: ['-r'],
    category: 'Dev',
    desc: 'Revokes a user or guilds premium status',
    example: 'revokepremium @RevenantEverest'
};