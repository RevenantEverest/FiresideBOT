const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM youtube_trackers');
    }
};