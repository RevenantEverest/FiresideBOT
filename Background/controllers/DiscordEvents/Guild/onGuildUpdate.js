const Discord = require('discord.js');

module.exports = async (bot, oldGuild, newGuild) => {
    if(oldGuild.name !== newGuild.name)
        guildsDB.update({ guild_id: newGuild.id, name: newGuild.name })
        .then(() => {
            let date = await utils.getDate();
            let embed = new Discord.RichEmbed();

            embed
            .setTitle(`**Guild Updated**`)
            .addBlankField()
            .setColor(0xff9900)
            .addField('Old Name:', oldGuild.name, true)
            .addField('New Name:', newGuild.name, true)
            .addField('ID:', newGuild.id, true)
            .addField('Member Count:', parseInt(newGuild.memberCount, 10).toLocaleString())
            .setFooter(`Guild Updated: ${date}`)

            if(process.env.ENVIRONMENT !== "DEV") bot.channels.get('538528459190829064').send(embed);
        })
        .catch(err => console.error(err));
};