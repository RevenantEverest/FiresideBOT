const db = require('../models/commandErrorLogsDB');
const bot = require('../Discord_Bot');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(errorLogs => res.json({ message: "Getting Error Logs", data: errorLogs.data.data }))
    },
};