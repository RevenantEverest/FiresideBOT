const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM role_reactions ORDER BY id ASC');
    },
    findById(id) {
        return db.one('SELECT * FROM role_reactions WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM role_reactions WHERE guild_id = $1 ORDER BY id ASC', id);
    },
    findByGuildIdAndMessageId(roleReaction) {
        return db.one('SELECT * FROM role_reactions WHERE guild_id = $/guild_id/ AND message_id = $/message_id/', roleReaction);
    },
    findByGuildIdAndRoleId(roleReaction) {
        return db.one('SELECT * FROM role_reactions WHERE guild_id = $/guild_id/ AND role_id = $/role_id/', roleReaction);
    },
    save(roleReaction) {
        return db.one(`INSERT INTO role_reactions (guild_id, message_id, channel_id, role_id, emoji_id, title, description)
        VALUES ($/guild_id/, $/message_id/, $/channel_id/, $/role_id/, $/emoji_id/, $/title/, $/description/)
        RETURNING *`, roleReaction);
    },
    update(roleReaction) {
        return db.one(`UPDATE role_reactions 
        SET
        title = $/title/,
        description = $/description/,
        channel_id = $/channel_id/,
        message_id = $/message_id/,
        role_id = $/role_id/,
        emoji_id = $/emoji_id/
        WHERE guild_id = $/guild_id/ AND id = $/id/
        RETURNING *`, roleReaction);
    },
    delete(id) {
        return db.none('DELETE FROM role_reactions WHERE id = $1', id);
    }
};