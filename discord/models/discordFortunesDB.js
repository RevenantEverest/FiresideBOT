const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM discord_fortunes');
    },
    findById(id) {
        return db.one('SELECT * FROM discord_fortunes WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM discord_fortunes WHERE guild_id = $1', id);
    },
    save(fortune) {
        return db.one(`INSERT INTO discord_fortunes (guild_id, fortunes)
        VALUES ($/guild_id/, $/fortunes/) 
        RETURNING *`, fortune);
    },
    update(fortune) {
        return db.one(`UPDATE discord_fortunes
        SET
        fortunes = $/fortunes/
        WHERE guild_id = $/guild_id/ AND id = $/id/
        RETURNING *`, fortune);
    },
    delete(id) {
        return db.none('DELETE FROM discord_fortunes WHERE id = $1', id);
    }
};