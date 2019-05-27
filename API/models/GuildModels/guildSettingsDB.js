const db = require('../../config/connection');

module.exports = {
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_settings WHERE guild_id = $1', id);
    },
    findPrefix(id) {
        return db.one('SELECT prefix FROM guild_settings WHERE guild_id = $1', id);
    },
    save(settings) {
        return db.one(`INSERT INTO guild_settings (guild_id, prefix)
        VALUES($/guild_id/, $/prefix/) RETURNING *`, settings);
    },
    update(settings) {
        return db.one(`UPDATE guild_settings SET prefix = $/prefix/
        WHERE guild_id = $/guild_id/ RETURNING *`, settings);
    }
};