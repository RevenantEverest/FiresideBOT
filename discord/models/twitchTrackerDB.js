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
        return db.one(`INSERT INTO twitch_tracker (guild_id, twitch_username, twitch_id, channel_id, role_id, flavor_text)
        VALUES ($/guild_id/, $/twitch_username/, $/twitch_id/, $/channel_id/, $/role_id/, $/flavor_text/)
        RETURNING *`, tracker);
    },
    update(tracker) {
        return db.one(`UPDATE twitch_tracker
        SET
        guild_id = $/guild_id/,
        twitch_username = $/twitch_username/,
        twitch_id = $/twitch_id/,
        channel_id = $/channel_id/,
        role_id = $/role_id/,
        flavor_text = $/flavor_text/
        WHERE id = $/id/
        RETURNING *`, tracker);
    },
    delete(id) {
        return db.none('DELETE FROM twitch_tracker WHERE id = $1', id);
    }
};