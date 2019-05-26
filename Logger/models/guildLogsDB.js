const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM guild_logs');
    },
    findById(id) {
        return db.one('SELECT * FROM guild_logs WHERE id = $1', id);
    },
    save(log) {
        return db.one(`INSERT INTO guild_logs (guild_id, guild_name, message, date) 
        VALUES($/guild_id/, $/guild_name/, $/message/, $/date/) RETURNING *`, log);
    },
    delete(id) {
        return db.none('DELETE FROM guild_logs WHERE id = $1', id);
    }
};