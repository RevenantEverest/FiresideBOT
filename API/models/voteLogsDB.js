const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM vote_logs');
    },
    findById(id) {
        return db.one('SELECT * FROM vote_logs WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.many('SELECT * FROM vote_logs WHERE discord_id = $1', id);
    },
    save(log) {
        return db.one(`INSERT INTO vote_logs (discord_id, date)
        VALUES ($/discord_id/, $/date/)
        RETURNING *`, log);
    }
};