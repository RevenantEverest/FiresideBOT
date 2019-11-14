const db = require('../../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM guild_premium_records');
    },
    findById(id) {
        return db.one('SELECT * FROM guild_premium_records WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_premium_records WHERE guild_id = $1', id);
    },
    save(record) {
        return db.one(`INSERT INTO guild_premium_records (guild_id, start_date, end_date, active, issued_by)
        VALUES ($/guild_id/, $/start_date/, $/end_date/, $/active/, $/issued_by/)
        RETURNING *`, record);
    },
    update(record) {
        return db.one(`UPDATE guild_premium_records 
        SET
        start_date = $/start_date/,
        end_date = $/end_date/,
        active = $/active/,
        issued_by = $/issued_by/
        WHERE guild_id = $/guild_id/
        RETURNING *`, record);
    }
};