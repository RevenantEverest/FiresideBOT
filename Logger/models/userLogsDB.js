const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM usersLogs');
    },
    findById(id) {
        return db.one('SELECT * FROM userLogs WHERE id = $1', id);
    },
    save(log) {
        return db.one(`INSERT INTO userLogs (discord_id, discord_username, message, date)
        VALUES (discord_id, discord_username, message, date)
        RETURNING *`, log);
    },
    delete(id) {
        return db.none('DELETE FROM userLogs WHERE id = $1', id);
    }
};