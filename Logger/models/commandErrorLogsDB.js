const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM command_error_logs');
    },
    findById(id) {
        return db.one('SELECT * FROM command_error_logs WHERE id = $1', id);
    },
    save(log) {
        return db.one(`INSERT INTO command_error_logs (command, args, error_message, guild_id, discord_id, error, date)
        VALUES($/command/, $/args/, $/error_message/, $/guild_id/, $/discord_id/, $/error/, $/date/)
        RETURNING *`, log);
    }
};