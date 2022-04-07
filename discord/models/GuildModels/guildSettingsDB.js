const db = require('../../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM guild_settings');
    },
    findById(id) {
        return db.one('SELECT * FROM guild_settings WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_settings WHERE guild_id = $1', id);
    },
    save(settings) {
        return db.one(`INSERT INTO guild_settings (guild_id, prefix, volume)
        VALUES ($/guild_id/, $/prefix/, $/volume/)
        RETURNING *`, settings);
    },
    update(settings) {
        return db.one(`UPDATE guild_settings
        SET
        prefix = $/prefix/,
        volume = $/volume/
        WHERE guild_id = $/guild_id/
        RETURNING *`, settings);
    }
};