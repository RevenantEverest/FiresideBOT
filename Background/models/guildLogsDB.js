const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM guild_logs');
    },
    findById(id) {
        return db.one('SELECT * FROM guild_logs WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_logs WHERE guild_id = $1', id);
    },
    save(guild) {
        return db.one(`INSERT INTO guild_logs (guild_id, date) VALUES ($/guild_id/, $/date/)
        RETURNING *`, guild);
    },
    delete(id) {
        return db.none('DELETE FROM guild_logs WHERE id = $1', id);
    }
};