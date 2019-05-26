const db = require('../models/guildLogsDB');

module.exports = {
    index(req, res, next) {
        db.findAll()
            .then(logs => {
                res.json({ message: 'Getting All Guild Logs', data: logs });
            })
            .catch(err => next(err));
    },
    getOne(req, res, next) {
        db.findById(req, params, id)
            .then(log => {

            })
            .catch(err => next(err));
    },
    create(req, res, next) {
        db.save(req.body)
            .then(log => {
                res.json({ message: 'Saving Guild Log', data: log });
            })
            .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
            .then(() => {
                res.status(200);
            })
            .catch(err => next(err));
    }
}