const db = require("../../models/GuildModels/guildSettingsDB");

module.exports = {
    getOneByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(settings => res.json({ message: "Getting Guild Settings", data: settings }))
        .catch(err => next(err));
    },
    create(req, res, next) {
        db.save(req.body)
        .then(settings => res.json({ message: "Settings Saved", data: settings }))
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(settings => res.json({ message: "Settings Updated", data: settings }))
        .catch(err => next(err));
    }
};