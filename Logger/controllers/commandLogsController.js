const db = require('../models/commandLogsDB');

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(logs => res.json({ message: "Getting All Command Logs", data: logs }))
        .catch(err => next(err));
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(log => res.json({ message: "Getting Command Log", data: log }))
        .catch(err => next(err));
    },
    create(req, res, next) {
        db.save(req.body)
        .then(log => res.json({ message: "Command Log Saved", data: log }))
        .catch(err => next(err));
    }
}
