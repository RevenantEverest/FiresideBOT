const db = require('../config/connection');

module.exports = {
    async findAll() {
        return db.many('SELECT * FROM discord_tickets');
    },
    async findById(id) {
        return db.one('SELECT * FROM discord_tickets WHERE id = $1', id);
    },
    async findByDiscordId(id) {
        return db.many('SELECT * FROM discord_tickets WHERE discord_id = $1', id);
    },
    async save(ticket) {
        return db.one(`INSERT INTO discord_tickets (discord_id, initial_message, ticket_date)
        VALUES($/discord_id/, $/initial_message/, $/ticket_date/)
        RETURNING *`, ticket);
    },
    async update(ticket) {
        return db.one(`UPDATE discord_tickets
        SET 
        discord_id = $/discord_id/,
        intial_message = $/initial_message/,
        ticket_date = $/ticket_date/
        WHERE id = $/id/
        RETURNING *`, ticket);
    },
    async delete(id) {
        return db.none('DELETE FROM discord_tickets WHERE id = $1', id);
    }
};