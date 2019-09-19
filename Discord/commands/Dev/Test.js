const errorHandler = require('../../controllers/errorHandler');
const utils = require('../utils/utils');
let DiscordBot = require('../../Discord_Bot');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    // console.log(message.channel.id);
    console.log(message.channel.id);
    errorHandler(bot, message, "err", "New Error Occurred", "Test")
    // message.channel.send(await utils.getDate())
    // console.log(DiscordBot.channels.get("613146139524333605"))
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};