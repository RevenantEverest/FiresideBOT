const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM auto_role');
    },
    findById(id) {
        return db.one('SELECT * FROM auto_role WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM auto_role WHERE guild_id = $1', id);
    },
    save(role) {
        return db.one('INSERT INTO auto_role (guild_id, role_id) VALUES ($/guild_id/, $/role_id/) RETURNING *', role);
    },
    update(role) {
        return db.one(`UPDATE auto_role
        SET
        role_id = $/role_id/
        WHERE guild_id = $/guild_id/ AND id = $/id/
        RETURNING *`, role);
    },
    delete(id) {
        return db.none('DELETE FROM auto_role WHERE id = $1', id);
    }
};