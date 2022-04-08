const db = require('../../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM user_premium_records');
    },
    findById(id) {
        return db.one('SELECT * FROM user_premium_records WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM user_premium_records WHERE discord_id = $1', id);
    },
    save(record) {
        return db.one(`INSERT INTO user_premium_records (discord_id, start_date, end_date, active)
        VALUES ($/discord_id/, $/start_date/, $/end_date/, $/active/)
        RETURNING *`, record);
    },
    update(record) {
        return db.one(`UPDATE user_premium_records
        SET
        start_date = $/start_date/,
        end_date = $/end_date/,
        active = $/active/
        WHERE discord_id = $/discord_id/
        RETURNING *`, record);
    }
};