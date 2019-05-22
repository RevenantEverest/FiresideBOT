const config = require('../config/config');

module.exports = {
    index(req, res, next) {
        res.json({ message: "Getting Commands", data: config.Discord_Commands })
    },
    getOne(req, res, next) {
        let command = config.Discord_Commands.filter(el => el.name === req.params.name);
        res.json({ message: "Getting Command", data: command });
    },
    getByCategory(req, res, next) {
        let category = config.Discord_Commands.filter(el => el.category === req.params.category);
        res.json({ message: "Getting Commands By Category", data: category })
    }
};