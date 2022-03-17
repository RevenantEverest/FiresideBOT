const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM new_member_messages');
    },
    findById(id) {
        return db.one('SELECT * FROM new_member_messages WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM new_member_messages WHERE guild_id = $1', id);
    },
    save(memberMessages) {
        return db.one(`INSERT INTO new_member_messages (guild_id, messages, channel_id, enabled)
        VALUES ($/guild_id/, $/messages/, $/channel_id/, $/enabled/)
        RETURNING *`, memberMessages);
    },
    update(memberMessages) {
        return db.one(`UPDATE new_member_messages 
        SET
        messages = $/messages/,
        channel_id = $/channel_id/, 
        enabled = $/enabled/
        WHERE guild_id = $/guild_id/ AND id = $/id/
        RETURNING *`, memberMessages);
    },
    delete(id) {
        return db.none('DELETE FROM new_member_messages WHERE id = $1', id);
    }
};