const db = require('../config/connection');

module.exports = {
    async findAll() {
        return db.many('SELECT * FROM discord_closed_tickets');
    },
    async findById(id) {
        return db.one('SELECT * FROM discord_closed_tickets WHERE ticket_id = $1', id);
    },
    async findByDiscordId(id) {
        return db.many('SELECT * FROM discord_closed_tickets WHERE discord_id = $1', id);
    },
    async save(ticket) {
        return db.one(`INSERT INTO discord_closed_tickets (ticket_id, discord_id, initial_message, ticket_date, close_date, closed_by)
        VALUES($/ticket_id/, $/discord_id/, $/initial_message/, $/ticket_date/, $/close_date/, $/closed_by/)
        RETURNING *`, ticket);
    },
    async update(ticket) {
        return db.one(`UPDATE discord_closed_tickets
        SET
        discord_id = $/discord_id/,
        intial_message = $/initial_message/,
        ticket_date = $/ticket_date/,
        close_date = $/close_date/,
        closed_by = $/closed_by/
        WHERE ticket_id = $/ticket_id/
        RETURNING *`, ticket);
    },
    async delete(id) {
        return db.none('DELETE FROM discord_closed_tickets WHERE ticket_id = $1', id);
    }
};