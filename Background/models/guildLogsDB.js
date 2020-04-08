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
        return db.one(`INSERT INTO guild_logs (guild_id, join_date) VALUES ($/guild_id/, $/join_date/)
        RETURNING *`, guild);
    },
    update(guild) {
        return db.one(`UPDATE guild_logs
        SET
        removal_date = $/removal_date/
        WHERE guild_id = $/guild_id/
        RETURNING *`, guild);
    },
    delete(id) {
        return db.none('DELETE FROM guild_logs WHERE id = $1', id);
    }
};