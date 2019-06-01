const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM discord_rank_records');
    },
    findById(id) {
        return db.one('SELECT * FROM discord_rank_records WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM discord_rank_records WHERE discord_id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM discord_rank_records WHERE guild_id = $1 ORDER BY xp DESC', id);
    },
    findByDiscordIdAndGuildId(id) {
        return db.one('SELECT * FROM discord_rank_records WHERE guild_id = $/guild_id/ AND discord_id = $/discord_id/', id);
    },
    save(rank) {
        return db.one(`INSERT INTO discord_rank_records (guild_id, discord_id, xp)
        VALUES ($/guild_id/, $/discord_id/,  $/xp/)
        RETURNING *`, rank);
    },
    update(rank) {
        return db.one(`UPDATE discord_rank_records
        SET
        guild_id = $/guild_id/,
        discord_id = $/discord_id/,
        xp = $/xp/
        WHERE id = $/id/
        RETURNING *`, rank)
    },
    deleteByDiscordId(id) {
        return db.none('DELETE FROM discord_rank_records WHERE discord_id = $1', id);
    },
    delete(id) {
        return db.one('DELETE FROM discord_rank_records WHERE id = $1', id);
    }
};