const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM streamer_roles');
    },
    findById(id) {
        return db.one('SELECT * FROM streamer_roles WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM streamer_roles WHERE guild_id = $1', id);
    },
    save(streamerRole) {
        return db.one(`INSERT INTO streamer_roles (guild_id, role_id, enabled)
        VALUES ($/guild_id/, $/role_id/, $/enabled/)
        RETURNING *`, streamerRole);
    },
    update(streamerRole) {
        return db.one(`UPDATE streamer_roles
        SET
        role_id = $/role_id/,
        enabled = $/enabled/
        WHERE guild_id = $/guild_id/ AND id = $/id/
        RETURNING *`, streamerRole);
    },
    delete(id) {
        return db.none('DELETE FROM streamer_roles WHERE id = $1', id);
    }
};