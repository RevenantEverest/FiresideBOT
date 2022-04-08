const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM vote_records');
    },
    findById(id) {
        return db.one('SELECT * FROM vote_records WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM vote_records WHERE discord_id = $1', id);
    },
    save(record) {
        return db.one(`INSERT INTO vote_records (discord_id, amount, date)
        VALUES ($/discord_id/, $/amount/, $/date/)
        RETURNING *`, record);
    },
    update(record) {
        return db.one(`UPDATE vote_records
        SET
        amount = $/amount/,
        date = $/date/
        WHERE discord_id = $/discord_id/ AND id = $/id/
        RETURNING *`, record);
    },
    delete(id) {
        return db.none('DELETE FROM vote_records WHERE id = $1', id);
    }
};