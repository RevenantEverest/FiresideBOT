const Discord = require('discord.js');
const gameStatServices = require('../../services/gameStatServices');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) 
    return message.channel.send('Please specify a Platform and your Origin profile name');
    
    if(!args.includes('pc') && !args.includes('xbox') && !args.includes('ps4')) 
        return message.channel.send('Please specify a valid Platform');

    let platformIndex = 0;
    let platform = '';

    if(args.includes('pc')) {
        platformIndex = args.indexOf('pc');
        platform = 'pc';
    }
    else if(args.includes('xbox')) {
        platformIndex = args.indexOf('xbox');
        platform = 'xbl';
    }
    else if(args.includes('ps4')) {
        platformIndex = args.indexOf('ps4');
        platform = 'psn';
    }

    args.splice(platformIndex, 1);

    gameStatServices.getFortniteStats({ platform: platform, profile: args[1] })
        .then(results => {
            if(results.data.error === 'Player Not Found') 
                return message.channel.send('Player Not Found');

            let username = results.data.epicUserHandle;
            let lifeStats = results.data.lifeTimeStats;
            let embed = new Discord.RichEmbed();
            embed
            .setColor(0x00ffff)
            .setThumbnail('https://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg')
            .addField('**Fortnite Stats**', username)
            .addBlankField()
            .addField('Wins:', lifeStats[8].value.toLocaleString(), true)
            .addField('Win Percentage:', lifeStats[9].value, true)
            .addField('Kills:', lifeStats[10].value.toLocaleString(), true)
            .addField('K/D:', lifeStats[11].value, true)
            .addField('Matches:', parseInt(lifeStats[7].value, 10).toLocaleString(), true)
            .addField('Score:', lifeStats[6].value.toLocaleString(), true)

            let placements = '';
            placements += `**${lifeStats[1].key.replace("s", "")}:** ${lifeStats[1].value.toLocaleString()}\n`;
            placements += `**${lifeStats[0].key.replace("s", "")}:** ${lifeStats[1].value.toLocaleString()}\n`;
            placements += `**${lifeStats[3].key.replace("s", "")}:** ${lifeStats[1].value.toLocaleString()}\n`;

            embed.addField('Placements:', placements).setFooter('Powered By TRN', 'https://fortnitetracker.com/Images/General/logo.png');
            message.channel.send(embed);
        })
        .catch(err => {
            if(err.response.status === 404)
                return message.channel.send('Player Not Found');
            else errorHandler(bot, message, err, "API Error", "Fortnite");
        });
};

module.exports.config = {
    name: 'fortnite',
    d_name: 'Fortnite',
    aliases: ['fn'],
    params: { required: true, params: 'Username, Platform' },
    category: 'GameStats',
    desc: 'Displays relevant Fortnite stats',
    example: 'fortnite RevenantEverest pc'
}