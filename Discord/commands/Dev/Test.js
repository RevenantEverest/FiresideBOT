const errorHandler = require('../../controllers/errorHandler');
const utils = require('../utils/utils');
let DiscordBot = require('../../Discord_Bot');
const moment = require('moment');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(message.author.id !== "163346982709100546") return;
    let date = await utils.getDate();
    let momentDate = await moment();

    let fakeDate = 'Fri Nov 15 2019 13:43:58 GMT-0500';

    message.channel.send(momentDate.toString());

    console.log(moment([2019, 11, 15]).diff([2019, 11, 12], 'days'));
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};