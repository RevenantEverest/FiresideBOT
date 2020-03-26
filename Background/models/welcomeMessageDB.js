const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM guild_welcome_message');
    },
    findById(id) {
        return db.one('SELECT * FROM guild_welcome_message WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_welcome_message WHERE guild_id = $1', id);
    },
    save(message) {
        return db.one(`INSERT INTO guild_welcome_message (guild_id, message) VALUES ($/guild_id/, $/message/) RETURNING *`, message);
    },
    update(message) {
        return db.one(`UPDATE guild_welcome_message
        SET
        message = $/message/
        WHERE guild_id = $/guild_id/ AND id = $/id/
        RETURNING *`, message);
    },
    delete(id) {
        return db.none('DELETE FROM guild_welcome_message WHERE id = $1', id)
    }
};