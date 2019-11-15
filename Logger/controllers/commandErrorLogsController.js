const db = require('../models/commandErrorLogsDB');

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(logs => res.json({ message: "Getting All Error Logs", data: logs }))
        .catch(err => next(err));
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(log => res.json({ message: "Getting Error Log", data: log }))
        .catch(err => next(err));
    },
    save(req, res, next) {
        db.save(req.body)
        .then(log => res.json({ message: "Error Log Saved", data: log }))
        .catch(err => next(err));
    }
};