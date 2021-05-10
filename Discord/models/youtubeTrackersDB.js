const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM youtube_trackers');
    },
    findById(id) {
        return db.one('SELECT * FROM youtube_trackers WHERE id = $1', id);
    },
    findByGuildId(guild_id) {
        return db.many('SELECT * FROM youtube_trackers WHERE guild_id = $1', guild_id);
    },
    save(tracker) {
        return db.one(`INSERT INTO youtube_trackers (guild_id, youtube_channel_id, youtube_channel_name, channel_id, role_id, flavor_text)
        VALUES ($/guild_id/, $/youtube_channel_id/, $/youtube_channel_name/, $/channel_id/, $/role_id/, $/flavor_text/)
        RETURNING *`, tracker);
    },
    update(tracker) {
        return db.one(`UPDATE youtube_tracker
        SET
        guild_id = $/guild_id/,
        youtube_channel_id = $/youtube_channel_id/,
        youtube_channel_name = $/youtube_channel_name/,
        channel_id = $/channel_id/,
        role_id = $/role_id/,
        flavor_text = $/flavor_text/
        WHERE id = $/id/
        RETURNING *`, tracker);
    },
    delete(id) {
        return db.none('DELETE FROM youtube_trackers WHERE id = $1', id);
    }
};