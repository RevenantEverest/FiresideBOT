const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM liked_songs');
    },
    findById(id) {
        return db.one('SELECT * FROM liked_songs WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.many('SELECT * FROM liked_songs WHERE discord_id = $1', id);
    },
    save(song) {
        return db.one(`INSERT INTO liked_songs (discord_id, title, author, link, duration, thumbnail_url, date)
        VALUES ($/discord_id/, $/title/, $/author/, $/link/, $/duration/, $/thumbnail_url/, $/date/)
        RETURNING *`, song);
    },
    delete(id) {
        return db.none('DELETE FROM liked_songs WHERE id = $1', id);
    }
};