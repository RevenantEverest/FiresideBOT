const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM discord_rank_settings');
    },
    findById(id) {
        return db.one('SELECT * FROM discord_rank_settings WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM discord_rank_settings WHERE guild_id = $1', id);
    },
    save(settings) {
        return db.one(`INSERT INTO discord_rank_settings (guild_id, general_increase_rate, complexity, channel_id)
        VALUES ($/guild_id/, $/general_increase_rate/. $/complexity/, $/channel_id/)
        RETURNING *`, settings);
    },
    update(settings) {
        return db.one(`UPDATE discord_rank_settings
        SET
        general_increase_rate = $/general_increase_rate/,
        complexity = $/complexity/,
        channel_id = $/channel_id/
        WHERE id = $/id/ AND guild_id = $/guild_id/
        RETURNING *`, settings);
    }
};