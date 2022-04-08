const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM custom_commands');
    },
    findById(id) {
        return db.one('SELECT * FROM custom_commands WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM custom_commands WHERE guild_id = $1', id);
    },
    findByGuildIdAndInput(command) {
        return db.one('SELECT * FROM custom_commands WHERE guild_id = $/guild_id/ AND input = $/input/', command);
    },
    findByDiscordId(id) {
        return db.many('SELECT * FROM custom_commands WHERE created_by = $1', id);
    },
    findByDiscordIdAndGuildId(id) {
        return db.many('SELECT * FROM custom_commands WHERE created_by = $/created_by/ AND guild_id = $/guild_id/', id);
    },
    save(command) {
        return db.one(`INSERT INTO custom_commands (guild_id, created_by, input, output, date)
        VALUES ($/guild_id/, $/created_by/, $/input/, $/output/, $/date/)
        RETURNING *`, command);
    },
    update(command) {
        return db.one(`UPDATE custom_commands
        SET
        input = $/input/,
        output = $/output/
        WHERE id = $/id/ AND guild_id = $/guild_id/
        RETURNING *`, command);
    },
    delete(id) {
        return db.none('DELETE FROM custom_commands WHERE id = $1', id);
    }
};