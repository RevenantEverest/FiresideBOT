const errorHandler = require('../../controllers/errorHandler');
const utils = require('../utils/utils');
let DiscordBot = require('../../Discord_Bot');
const moment = require('moment');
const heapdump = require('heapdump');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;
    heapdump.writeSnapshot();
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};