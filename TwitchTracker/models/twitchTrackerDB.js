const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM twitch_tracker');
    },
    findById(id) {
        return db.one('SELECT * FROM twitch_tracker WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM twitch_tracker WHERE guild_id = $1', id);
    },
    save(tracker) {
        return db.one(`INSERT INTO twitch_tracker (guild_id, twitch_username, channel_id, role_id)
        VALUES ($/guild_id/, $/twitch_username/, $/channel_id/, $/role_id/)
        RETURNING *`, tracker);
    },
    update(tracker) {
        return db.one(`UPDATE twitch_tracker
        SET
        guild_id = $/guild_id/,
        twitch_username = $/twitch_username/,
        channel_id = $/channel_id/,
        role_id = $/role_id/
        WHERE id = $/id/
        RETURNING *`, tracker);
    },
    delete(id) {
        return db.none('DELETE FROM twitch_tracker WHERE id = $1', id);
    }
};