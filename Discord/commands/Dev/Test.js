const errorHandler = require('../../controllers/errorHandler');
const utils = require('../utils/utils');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    // console.log(message.channel.id);
    errorHandler(bot, message, "err", "New Error Occurred", "Test")
    message.channel.send(await utils.getDate())
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};