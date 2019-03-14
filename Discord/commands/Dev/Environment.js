const Discord = require('discord.js');
const config = require('../../../config/config');

async function updateUpdatePending(message) {
    config.Discord_Env.updatePending = true;

    message.channel.send("`Update Now Pending`");
}

async function displayEnv(message) {
    let embed = new Discord.RichEmbed();
    let env = config.Discord_Env;

    embed
    .setColor(0xffcc00)
    .setTitle("FiresideBOT Environment")
    .addBlankField()
    .addField("Update Pending:", (env.updatePending ? "Yes" : "No"), true)

    message.channel.send(embed);
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    if(!args[1]) displayEnv(message);
    if(args.includes("-up")) updateUpdatePending(message);

};

module.exports.config = {
    name: 'environment',
    d_name: 'Environment',
    aliases: ['env']
};