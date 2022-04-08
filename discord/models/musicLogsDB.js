const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM music_logs');
    },
    findById(id) {
        return db.one('SELECT * FROM music_logs WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM music_logs WHERE guild_id = $1', id);
    },
    findByDiscordId() {
        return db.many('SELECT * FROM music_logs WHERE discord_id = $1', id);
    },
    save(log) {
        return db.one(`INSERT INTO music_logs (guild_id, discord_id, title, author, link, duration, thumbnail_url, date)
        VALUES ($/guild_id/, $/discord_id/, $/title/, $/author/, $/link/, $/duration/, $/thumbnail_url/, $/date/)
        RETURNING *`, log);
    }
};