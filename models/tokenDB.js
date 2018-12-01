const db = require('../config/connection');

module.exports = {
    findOne(id) {
        return db.one('SELECT * FROM tokens WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM tokens WHERE discord_id = $1', id);
    },
    save(token) {
        return db.one(`INSERT INTO tokens (discord_id, token, refresh_token, expires_in)
        VALUES ($/discord_id/, $/token/, $/refresh_token/, $/expires_in/)
        RETURNING *`, token);
    },
    update(token) {
        return db.one(`UPDATE tokens 
        SET
        token = $/token/,
        refresh_token = $/refresh_token/,
        expires_in = $/expures_in/
        WHERE discord_id = $/discord_id/
        RETURNING *`, token);
    }
}