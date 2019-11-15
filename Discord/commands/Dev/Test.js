const errorHandler = require('../../controllers/errorHandler');
const utils = require('../utils/utils');
let DiscordBot = require('../../Discord_Bot');
const moment = require('moment');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;
    errorHandler(bot, message, "This is an error Message", "Error Finding Row In DB", "Test");
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};