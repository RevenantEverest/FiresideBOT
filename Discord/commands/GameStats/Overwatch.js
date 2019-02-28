const Discord = require('discord.js');
const apiServices = require('../../services/apiServices');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!args[1]) return message.channel.send('Please specify a BattleTag, Platform, and Region');
    
    let platformIndex, regionIndex = 0;
    let platform, region = '';

    /*
        Checks for valid Platform in the args array
        Grabs the index then sets the Platform to the corresponding string
        Removes the index from args
    */

    if(args.includes('pc')) {
        platformIndex = args.indexOf('pc');
        platform = 'pc';
    }
    else if(args.includes('xbox')) {
        platformIndex = args.indexOf('xbox');
        platform = 'xbox';
    }
    else if(args.includes('ps4')) {
        platformIndex = args.indexOf('ps4');
        platform = 'ps4';
    }
    else 
        return message.channel.send('Please Specify a valid Platform');

    args.splice(platformIndex, 1);

    /*
        Checks for a valid Region in the args array
        Grabs the index then sets the Region to the corresponding Region
        Removes the index from args
    */

    if(args.includes('eu')) {
        regionIndex = args.indexOf('eu');
        region = 'eu';
    }
    else if(args.includes('us')) {
        regionIndex = args.indexOf('us');
        region = 'us';
    }
    else if(args.includes('asia')) {
        regionIndex = args.indexOf('asia');
        region = 'asia';
    }
    else
        return message.channel.send('Please Specify a valid Region');

    args.splice(regionIndex, 1);

    let battletag = args[1].replace("#", "-");
    apiServices.getOverwatchStats({ platform: platform, battletag: battletag, region: region })
        .then(results => {
            if(results.data.error === 'Player not found')
                return message.channel.send('Player Not Found');

            let data = results.data;
            let embed = new Discord.RichEmbed();
            embed
            .addField('**Overwatch Stats**', data.name)
            .setColor(0xff00ff)
            .setThumbnail(data.icon)
            .addBlankField()
            .addField('Level:', data.level, true)
            .addField('Prestige:', data.prestige, true)
            .addField('Endorsements:', data.endorsement)

            if(data.private)
                embed.addField('Private Profile:', 'Yes');
            else {
                let Comp_Stats = data.competitiveStats.games;
                let Comp_Awards = data.competitiveStats.awards;
                let compAwards = `**Awards**
                Cards: ${Comp_Awards.cards}
                Medals: ${Comp_Awards.medals}
                Bronze Medals: ${Comp_Awards.medalsBronze}
                Silver Medals: ${Comp_Awards.medalsSilver}
                Gold Medals: ${Comp_Awards.medalsGold}\n\n`;
                let genComp = `**General**
                Games Played: ${Comp_Stats.played}
                Games Won: ${Comp_Stats.won}`;
                embed.addField('Competitive Stats:', compAwards + genComp, true)

                let QP_Stats = data.quickPlayStats.games;
                let QP_Awards = data.quickPlayStats.awards;
                let quickPlayAwards = `**Awards**
                Cards: ${QP_Awards.cards}
                Medals: ${QP_Awards.medals}
                Bronze Medals: ${QP_Awards.medalsBronze}
                Silver Medals: ${QP_Awards.medalsSilver}
                Gold Medals: ${QP_Awards.medalsGold}\n\n`;
                let genQP = `**General**
                Games Played: ${QP_Stats.played}
                Games Won: ${QP_Stats.won}`;

                embed.addField('Quick Play Stats:', quickPlayAwards + genQP, true);
            }
            message.channel.send(embed);
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports.config = {
    name: 'overwatch',
    d_name: 'Overwatch',
    aliases: ['ow'],
    params: { required: true, params: 'Region, Platform, Battletag' },
    category: 'GameStats',
    desc: 'Displays relevant Competitive and Quick Play stats for Overwatch',
    example: 'overwatch pc us Revenant#11470'
};