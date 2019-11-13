const errorHandler = require('../../controllers/errorHandler');
const utils = require('../utils/utils');
let DiscordBot = require('../../Discord_Bot');
const moment = require('moment');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    let date = await moment().add(30, 'd');
    console.log(moment(date).format("Do MMM YYYY"));
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};