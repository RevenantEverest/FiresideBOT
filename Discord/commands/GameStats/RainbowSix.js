const gameStatServices = require('../../services/gameStatServices');
const Discord = require('discord.js');
const utils = require('../utils/utils');

const errorHandler = require('../../controllers/errorHandler');

const ranks = [
    {name: "Copper IV", image: "https://i.imgur.com/mBiT3oJ.png"}, {name: "Copper III", image: "https://i.imgur.com/MoqdihO.png"},
    {name: "Copper II", image: "https://i.imgur.com/DjoCqbJ.png"}, {name: "Copper I" ,image: "https://i.imgur.com/bYOhH2S.png"},
    {name: "Bronze IV", image: "https://i.imgur.com/E02Zlgb.png"}, {name: "Bronze III", image: "https://i.imgur.com/MsIpTHB.png"},
    {name: "Bronze II", image: "https://i.imgur.com/YmJVx9U.png"}, {name: "Bronze I" ,image: "https://i.imgur.com/ng9GAB1.png"},
    {name: "Silver IV", image: "https://i.imgur.com/g360Xil.png"}, {name: "Silver III", image: "https://i.imgur.com/m4uGmZL.png"},
    {name: "Silver II", image: "https://i.imgur.com/wE462Ul.png"}, {name: "Silver I", image: "https://i.imgur.com/9mm39px.png"},
    {name: "Gold IV", image: "https://i.imgur.com/kWiUKp9.png"}, {name: "Gold III", image: "https://i.imgur.com/PYy6ilk.png"},
    {name: "Gold II", image: "https://i.imgur.com/8yQquNH.png"}, {name: "Gold I", image: "https://i.imgur.com/ZLVfWXz.png"},
    {name: "Platinum III", image: "https://i.imgur.com/2HjnYDh.png"}, {name: "Platinum II", image: "https://i.imgur.com/xsuL216.png"},
    {name: "Platinum I", image: "https://i.imgur.com/SbL6wMp.png"}, {name: "Diamond", image: "https://i.imgur.com/pttSbHh.png"},
];

async function handleGeneric(username, platform, embed, message) {
    console.log("Handle Generic")
    gameStatServices.getRainbowSixStats({ username: username, platform: platform, type: "generic"})
    .then(async stats => {
        stats = stats.data;
        console.log(stats.data);
        embed
        .setAuthor(stats.username, stats.avatar_url_256)
        .addField("General Player Stats", `[View Full Stats For ${stats.username}](https://r6stats.com/stats/${stats.uplay_id})`)
        .setThumbnail(stats.avatar_url_256)
        .addField("About:", 
            `**Level**: ${stats.progression.level.toLocaleString()}\n` +
            `**Playtime**: ${await utils.timeParser(stats.stats.general.playtime)}\n` +
            `**Lootbox Change**: ${stats.progression.lootbox_probability}\n` + 
            `**Total XP**: ${stats.progression.total_xp.toLocaleString()}`,
            true
        )
        .addField("Win/Loss:", 
            `**Wins**: ${stats.stats.general.wins.toLocaleString()}\n` +
            `**Losses**: ${stats.stats.general.losses.toLocaleString()}\n` +
            `**W/L**: ${stats.stats.general.wl}\n`, 
            true
        )
        .addField("Kill/Deaths:", 
            `**Kills**: ${stats.stats.general.kills.toLocaleString()}\n` +
            `**Deaths**: ${stats.stats.general.deaths.toLocaleString()}\n` +
            `**Suicides**: ${stats.stats.general.suicides.toLocaleString()}\n` +
            `**Revives**: ${stats.stats.general.revives.toLocaleString()}\n` +
            `**Assists**: ${stats.stats.general.assists.toLocaleString()}\n` + 
            `**K/D**: ${stats.stats.general.kd}\n`,
            true
        )
        .addField("Kill Breakdown:", 
            `**Headshots**: ${stats.stats.general.headshots.toLocaleString()}\n` +
            `**Blind Kills**: ${stats.stats.general.blind_kills.toLocaleString()}\n` +
            `**Penetration Kills**: ${stats.stats.general.penetration_kills.toLocaleString()}\n` +
            `**Melee Kills**: ${stats.stats.general.melee_kills.toLocaleString()}`,
            true
        )
        .addField("Misc:", 
            `**Bullets Fired**: ${stats.stats.general.bullets_fired.toLocaleString()}\n` +
            `**Bullets Hit**: ${stats.stats.general.bullets_hit.toLocaleString()}\n` +
            `**Barricades Deployed**: ${stats.stats.general.barricades_deployed.toLocaleString()}\n` + 
            `**Distance Travelled**: ${stats.stats.general.distance_travelled.toLocaleString()}\n` +
            `**Reinforcements Deployed**: ${stats.stats.general.reinforcements_deployed.toLocaleString()}\n` +
            `**Rappel Breaches**: ${stats.stats.general.rappel_breaches.toLocaleString()}\n`,
            true
        )

        message.channel.send(embed);
    })
    .catch(err => errorHandler(bot, message, err, "API Error", "RainbowSix"));
};

async function handleOperators(username, platform, embed, message) {
    gameStatServices.getRainbowSixStats({ username: username, platform: platform, type: "operators"})
    .then(stats => {
        console.log(stats.data);
    })
    .catch(err => errorHandler(bot, message, err, "API Error", "RainbowSix"));
};

async function handleSeasonal(args, platform, embed, message) {
    if(!args[2]) return message.channel.send("Please Specify a region");
    let region = null;
    if(args.includes("apac")) {
        regionIndex = 2;
        args.splice(args.indexOf("apax"), 1);
    }
    else if(args.includes("emea")) {
         regionIndex = 1;
         args.splice(args.indexOf("emea"), 1)   
    }
    else if(args.includes("ncsa")) {
        regionIndex = 0;
        args.splice(args.indexOf("ncsa"), 1);
    }
    else return message.channel.send("Please Specify a valid region");

    gameStatServices.getRainbowSixStats({ username: args[1], platform: platform, type: "seasonal"})
    .then(stats => {
        let regionData = Object.entries(Object.entries(stats.data.seasons)[0][1].regions)[regionIndex][1][0];
        console.log(ranks[17])
        embed
        .setAuthor(stats.data.username, stats.data.avatar_url_256)
        .addField(`Season Stats for ${Object.entries(stats.data.seasons)[0][1].name}`, `[View Full Stats For ${stats.data.username}](https://r6stats.com/stats/${stats.data.uplay_id})`)
        .setThumbnail(ranks.filter(el => el.name === regionData.rank_text)[0].image)
        .addField("Rank:", 
            `${regionData.rank_text}\n` +
            `**Max**: ${ranks[regionData.max_rank - 1].name}`,
            true
        )
        .addField("MMR:", 
            `${regionData.mmr}\n` +
            `**Max**: ${regionData.max_mmr}`,
            true
        )
        .addField("Wins / Losses:", 
            `**Wins**: ${regionData.wins}\n` +
            `**Losses**: ${regionData.losses}\n` +
            `**W/L**: ${(Math.round(regionData.wins / (regionData.wins + regionData.losses) * 100)) / (Math.round(regionData.losses / (regionData.wins + regionData.losses) * 100))}`,
            true
        )

        message.channel.send(embed);
    })
    .catch(err => errorHandler(bot, message, err, "API Error", "RainbowSix"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please Specify a Username / Platform and appropriate flag");

    let embed = new Discord.RichEmbed();
    embed
    .setColor(0x6666ff)
    .setFooter("Stats Provided by R6Stats.com", `https://images-ext-1.discordapp.net/external/TAlrxiJSwZIAg34_tpPdQu7WfZ0JFxQVR47GP5EbYV8/https/r6stats.com/img/logos/r6stats-100.png`);

    let platform = null;
    if(args.includes("pc")) {
        platform = "uplay";
        args.splice(args.indexOf("pc"), 1);
    } 
    else if(args.includes("xbox")) {
        platform = "xone";
        args.splice(args.indexOf("xone"), 1);
    }
    else if(args.includes("ps4")) {
        platform = "ps4";
        args.splice(args.indexOf("ps4"), 1);
    }
    else return message.channel.send("Please Specify a valid Platform");

    
    if(args.includes("-o")) {
        args.splice(args.indexOf("-o"), 1);
        handleOperators(args[1], platform, embed, message);
    }
    else if(args.includes("-s")) {
        args.splice(args.indexOf("-s"), 1);
        handleSeasonal(args, platform, embed, message);
    }
    else return handleGeneric(args[1], platform, embed, message);
};

module.exports.config = {
    name: 'rainbowsix',
    d_name: 'RainbowSix',
    aliases: ['r6', 'rainbowsix', 'rainbowsix'],
    params: { required: true, params: 'Username, Platform' },
    category: 'GameStats',
    desc: 'Displays relevant stats for your most recent Apex Legend',
    example: 'apex RevenantEverest uplay'
};