const Discord = require('discord.js');
const moment = require('moment');
const userPremiumRecords = require('../../controllers/dbControllers/userPremiumRecordsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let infoEmbed = new Discord.MessageEmbed();
    let user = null;
    if(args[1])
        if(args[1].startsWith('<@')) user = bot.users.resolve(/<@!?(\d+)>/.exec(args.join(" "))[1]);
    let accountCreated = user ? user.createdAt.toString().split(" ") : message.author.createdAt.toString().split(" ");
    user ? user : user = message.author;

    userPremiumRecords.getByDiscordId(bot, message, "UserInfo", user.id, handlePremiumRecord, sendEmbed);

    async function handlePremiumRecord(record) {
        user.fireside = {
            premium: record
        };
        sendEmbed();
    };

    async function sendEmbed() {
        infoEmbed
        .setColor(0xff0066)
        .setThumbnail(user.avatarURL({ dynamic: true }) ? user.avatarURL({ dynamic: true }) : "https://i.imgur.com/CBCTbyK.png")
        .addField('**User Info**', `${user.username} #${user.discriminator}`)
        .addField('Status:', user.presence.status, true)
        .addField('Game:', (user.presence.game || 'NA'), true)
        .addField('Account Created:', `${accountCreated[1]} ${accountCreated[2]} ${accountCreated[3]}`)
        .setFooter(`User ID: ${user.id}`)

        if(user.fireside && user.fireside.premium)
            infoEmbed.addField('Fireside Premium User Since:', moment(user.fireside.premium.start_date).format("MMM DD YYYY"));

        message.channel.send(infoEmbed);
    };
};

module.exports.config = {
    name: 'userinfo',
    d_name: 'UserInfo',
    aliases: ['ui'],
    category: 'Info',
    desc: 'Displays relevant User Info',
    example: 'userinfo'
};