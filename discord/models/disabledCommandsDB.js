const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM disabled_commands');
    },
    findById(id) {
        return db.one('SELECT * FROM disabled_commands WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM disabled_commands WHERE guild_id = $1', id);
    },
    save(command) {
        return db.one('INSERT INTO disabled_commands (guild_id, command) VALUES ($/guild_id/, $/command/) RETURNING *', command);
    },
    delete(id) {
        return db.none('DELETE FROM disabled_commands WHERE id = $1', id);
    }
};