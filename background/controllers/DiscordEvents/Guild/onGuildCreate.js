const Discord = require('discord.js');
const guildsController = require('../../guildsController');
const guildLogsController = require('../../guildLogsController');

module.exports = async (bot, guild) => {
    
    guildsController.saveGuild(bot, guild);
    guildLogsController.getByGuildId(guild, sendIntroMessage);

    async function sendIntroMessage() {
        const channels = guild.channels.cache.array();
        let embed = new Discord.MessageEmbed();
        let welcome = { general: null, channels: null };

        embed
        .setColor(0x00ff00)
        .addField(
            'Thank you for adding FiresideBOT <:Fireside:669895306242162699>', 
            'Learn what you can do with `?help` command\n\n' +
            `If you're experiencing any issue please use our [Support Server](https://discord.gg/TqKHVUa)\n\n` +
            `And if FiresideBOT isn't meeting your expectations please fill out this [form](https://forms.gle/UuSegzJ2UdgLKgYa8) so that we can improve!`
        );

        for(let i = 0; i < channels.length; i++) {
            if(channels[i].type !== 'text') continue;
            if(/^.*general.*$/i.test(channels[i].name)) {
                if(!welcome.general || channels[i].position < welcome.general.position)
                    welcome.general = channels[i];
            }    
            else if(!welcome.channels || channels[i].position < welcome.channels.position)
                welcome.channels = channels[i];
        }

        welcome.general ? bot.channels.resolve(welcome.general.id).send(embed) : bot.channels.resolve(welcome.channels.id).send(embed);
    }
};