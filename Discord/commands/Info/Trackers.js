const Discord = require('discord.js');
const twitchTrackersController = require('../../controllers/dbControllers/twitchTrackerController');
const youtubeTrackersController = require('../../controllers/dbControllers/youtubeTrackersController');

const { pagination } = require("../../utils");

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[0]) return message.channel.send("Please specify a relevant flag");

    if(args.includes("-t") && args.includes("-yt")) return message.channel.send("Please specify either **-t** or **-yt**, not both");
    else if(args.includes("-t")) return getTwitchTrackers();
    else if(args.includes("-yt")) return getYouTubeTrackers();
    else return message.channel.send("Invalid Flag");

    async function getTwitchTrackers() {
        twitchTrackersController.getByGuildId(bot, message, "Trackers", message.guild.id, (trackers) => {
            trackers.map(el => {
                el.trackerName = el.twitch_username;
                return el;
            });

            if(trackers.length < 5) return handleSingleEmbed("twitch", trackers);
            else return handlePagination("twitch", trackers);
        });
    };

    async function getYouTubeTrackers() {
        youtubeTrackersController.getByGuildId(bot, message, "Trackers", message.guild.id, (trackers) => {
            trackers.map(el => {
                el.trackerName = el.youtube_channel_name;
                return el;
            });

            if(trackers.length < 5) return handleSingleEmbed("youtube", trackers);
            else return handlePagination("youtube", trackers);
        });
    }; 

    async function handleSingleEmbed(type, trackers) {
        let embed = new Discord.MessageEmbed();
        if(type === "twitch") embed.setColor(0xcc66ff).setTitle("Twitch Trackers");
        else if(type === "youtube") embed.setColor(0xff0000).setTitle("YouTube Trackers");

        trackers.forEach((el, idx) => {
            let fieldTitle = `${idx + 1}. ${el.trackerName}`;
            let fieldValue = `**ID:** ${el.id}\n` +
            `**Channel:** <#${el.channel_id}>\n` +
            `**Role:** ${el.role_id === "@everyone" ? "@everyone" : (el.role_id === "none" ? 'none' : `<@&${el.role_id}>`)}\n` + 
            `${el.flavor_text ? `**Flavor Text:** ${el.flavor_text}` : ''}`;
            embed.addField(fieldTitle, fieldValue);
        });

        embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }));
        message.channel.send(embed);
    };

    async function handlePagination(type, trackers) {
        let contentArr = [];
        let fields = [];
        let author = { text: message.guild.name, image: message.guild.iconURL({ dynamic: true }) };
        let category = null;
        let color = null;

        if(type === "twitch") {
            category = "Twitch Trackers";
            color = 0xcc66ff;
        }
        else if(type === "youtube") {
            category = "YouTube Trackers";
            color = 0xff0000;
        }

        trackers.forEach((el, idx) => {
            let fieldValue = `**ID:** ${el.id}\n` +
            `**Channel:** <#${el.channel_id}>\n` +
            `**Role:** ${el.role_id === "@everyone" ? "@everyone" : (el.role_id === "none" ? 'none' : `<@&${el.role_id}>`)}\n` + 
            `${el.flavor_text ? `**Flavor Text:** ${el.flavor_text}` : ''}`;

            fields.push({ field:`${idx + 1}. ${el.trackerName}`, value: fieldValue });

            if((idx + 1) % 5 === 0 && idx !== 0) {
                contentArr.push({ category: category, author: author, fields: fields });
                fields = [];
            }

            if((trackers.length - 1) === idx) contentArr.push({ category: category, author: author, fields: fields });
        });

        pagination.createPagination(message, bot, contentArr, { title: true, color: color });
    };
};

module.exports.config = {
    name: "trackers",
    d_name: "Trackers",
    aliases: [],
    category: "Info",
    desc: "Displays available Trackers",
    example: "trackers"
};