const bot = require('../Discord_Bot');
const moment = require('moment');

module.exports = {
    getNewGuildMembers(req, res, next) {
        let memberTimestamps = bot.guilds.resolve(req.params.id).members.cache.array().filter(el => !el.user.bot).map(el => el.joinedTimestamp);

        let temp = [];
        for(let i = 0; i < 8; i++) {
            temp.push(memberTimestamps.filter(el => moment(el).format("DD-MM-YYY") === moment().subtract(i, "days").format("DD-MM-YYY")));
        }
    
        res.json({message: "", data: [].concat.apply([], temp) });
    }
};