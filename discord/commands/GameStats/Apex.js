const Discord = require('discord.js');
const gameStatServices = require('../../services/gameStatServices');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) 
        return message.channel.send('Please specify a Platform and your Origin profile name');
        
    if(!args.includes('pc') && !args.includes('xbox') && !args.includes('ps4')) 
        return message.channel.send('Please specify a valid Platform');
    
    let platformIndex = 0;
    let platform = 0;

    if(args.includes('pc')) {
        platformIndex = args.indexOf('pc');
        platform = 5;
    }
    else if(args.includes('xbox')) {
        platformIndex = args.indexOf('xbox');
        platform = 1;
    }
    else if(args.includes('ps4')) {
        platformIndex = args.indexOf('ps4');
        platform = 2;
    }

    args.splice(platformIndex, 1);

    gameStatServices.getApexStats({ platform: platform, profile: args[1]  })
        .then(results => {
            let embed = new Discord.MessageEmbed();
            let generalStats = results.data.data.stats[0];
            let characterStats = results.data.data.children[0];
            embed
            .setAuthor(`${message.author.username} #${message.author.discriminator}`, message.author.avatarURL({ dynamic: true }))
            .setColor(0xff3300)
            .addField('**APEX Legends Stats**', results.data.data.metadata.platformUserHandle)
            .setThumbnail(characterStats.metadata.icon)
            .addField('Level:', generalStats.value, true)
            .addField('Last Legend:', characterStats.metadata.legend_name, true)
            .addField(`${characterStats.metadata.legend_name} Kills:`, characterStats.stats[0].value.toLocaleString())
            .setFooter('Powered By TRN', 'https://fortnitetracker.com/Images/General/logo.png')
            message.channel.send(embed);
        })
        .catch(err => {
            if(err.response.status = 404)
                return message.channel.send('Invalid Profile');
            else errorHandler(bot, message, err, "API Error", "Apex");
        });
};

module.exports.config = {
    name: 'apex',
    d_name: 'Apex',
    aliases: [],
    params: { required: true, params: 'Username, Platform' },
    category: 'GameStats',
    desc: 'Displays relevant stats for your most recent Apex Legend',
    example: 'apex RevenantEverest pc'
};