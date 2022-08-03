const db = require('../config/connection');

module.exports = {
    findById(id) {
        return db.one('SELECT * FROM api_tokens WHERE id = $1', id);
    },
    findByService(service) {
        return db.one('SELECT * FROM api_tokens WHERE service = $1', service);
    },
    save(token) {
        return db.one(`INSERT INTO api_tokens (service, token, refresh_token, expires_in, date)
        VALUES ($/service/, $/token/, $/refresh_token/, $/expires_in/, $/date/)
        RETURNING *`, token);
    },
    update(token) {
        return db.one(`UPDATE api_tokens
        SET
        token = $/token/,
        refresh_token = $/refresh_token/,
        expires_in = $/expires_in/,
        date = $/date/
        WHERE service = $/service/ AND id = $/id/
        RETURNING *`, token);
    }
};