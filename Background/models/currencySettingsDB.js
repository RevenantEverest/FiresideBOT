const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM currency_settings');
    },
    findById(id) {
        return db.one('SELECT * FROM currency_settings WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM currency_settings WHERE guild_id = $1', id);
    },
    save(settings) {
        return db.one(`INSERT INTO currency_settings (guild_id, currency_name, currency_increase_rate)
        VALUES($/guild_id/, $/currency_name/, $/currency_increase_rate/)
        RETURNING *`, settings);
    },
    update(settings) {
        return db.one(`UPDATE currency_settings
        SET
        currency_name = $/currency_name/,
        currency_increase_rate = $/currency_increase_rate/
        WHERE guild_id = $/guild_id/
        RETURNING *`, settings);
    },
    delete(id) {
        return db.none('DELETE FROM currency_settings WHERE guild_id = $1', id);
    }
};