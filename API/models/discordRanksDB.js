const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM discord_ranks');
    },
    findById(id) {
        return db.one('SELECT * FROM discord_ranks WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM discord_ranks WHERE guild_id = $1', id);
    },
    save(rank) {
        return db.one(`INSERT INTO discord_ranks (guild_id. rank_name, rank_number)
        VALUES ($/guild_id/, $/rank_name/, $/rank_number/)
        RETURNING *`, rank);
    },
    update(rank) {
        return db.one(`UPDATE discord_ranks 
        SET
        guild_id = $/guild_id/,
        rank_name = $/rank_name/,
        rank_number = $/rank_number/
        WHERE id = $/id/
        RETURNING *`, rank);
    },
    delete(id) {
        return db.none('DELETE FROM discord_ranks WHERE id = $1', id);
    }
};