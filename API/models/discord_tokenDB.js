const db = require('../config/connection');

module.exports = {
    findOne(id) {
        return db.one('SELECT * FROM discord_tokens WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM discord_tokens WHERE discord_id = $1', id);
    },
    findByToken(token) {
        return db.one('SELECT * FROM discord_tokens WHERE token = $1', token);
    },
    save(token) {
        return db.one(`INSERT INTO discord_tokens (discord_id, token, refresh_token, expires_in)
        VALUES ($/discord_id/, $/access_token/, $/refresh_token/, $/expires_in/)
        RETURNING *`, token);
    },
    update(token) {
        return db.one(`UPDATE discord_tokens 
        SET
        token = $/access_token/,
        refresh_token = $/refresh_token/,
        expires_in = $/expires_in/
        WHERE discord_id = $/discord_id/
        RETURNING *`, token);
    },
    deleteToken(id) {
        return db.none('DELETE FROM discord_tokens WHERE discord_id = $1', id);
    }
}