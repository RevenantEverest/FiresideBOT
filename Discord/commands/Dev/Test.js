const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    // console.log(message.channel.id);
    errorHandler(bot, message, "err", "New Error Occurred", "Test")
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};