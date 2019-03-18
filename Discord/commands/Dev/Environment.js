const Discord = require('discord.js');
const config = require('../../../config/config');

async function updateUpdatePending(message, options) {
    options.updatePending = true;

    message.channel.send("`Update Now Pending`");
};

async function displayEnv(message, options) {
    let embed = new Discord.RichEmbed();

    embed
    .setColor(0xffcc00)
    .setTitle("FiresideBOT Environment")
    .addBlankField()
    .addField("Update Pending:", (options.updatePending ? "Yes" : "No"), true)

    message.channel.send(embed);
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    if(!args[1]) displayEnv(message, options);
    if(args.includes("-up")) updateUpdatePending(message, options);

};

module.exports.config = {
    name: 'environment',
    d_name: 'Environment',
    aliases: ['env']
};