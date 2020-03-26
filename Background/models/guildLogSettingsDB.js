const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM guild_log_settings');
    },
    findById(id) {
        return db.one('SELECT * FROM guild_log_settings WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_log_settings WHERE guild_id = $1', id);
    },
    save(settings) {
        return db.one(`INSERT INTO guild_log_settings (guild_id, enabled, channel_id) VALUES ($/guild_id/, $/enabled/, $/channel_id/) RETURNING *`, settings);
    },
    update(settings) {
        return db.one(`UPDATE guild_log_settings
        SET 
        enabled = $/enabled/,
        channel_id = $/channel_id/
        WHERE guild_id = $/guild_id/
        RETURNING *`, settings);
    }
};