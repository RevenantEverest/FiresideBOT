const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM guild_log_settings');
    },
    findById(id) {
        return db.one('SELECT * FROM guild_log_settings WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_log_settings WHERE guild_id = $1', id);
    },
    save(settings) {
        return db.one(`INSERT INTO guild_log_settings 
        (
            guild_id, 
            enabled, 
            channel_id, 
            member_role_change,
            member_nickname_change, 
            emoji_create, 
            emoji_update, 
            emoji_delete, 
            role_create,
            role_update,
            role_delete
        ) 
        VALUES 
        (
            $/guild_id/,
            $/enabled/,
            $/channel_id/,
            $/member_role_change/,
            $/member_nickname_change/,
            $/emoji_create/,
            $/emoji_update/,
            $/emoji_delete/,
            $/role_create/,
            $/role_update/,
            $/role_delete/
        ) 
        RETURNING *`, settings);
    },
    update(settings) {
        return db.one(`UPDATE guild_log_settings
        SET 
        enabled = $/enabled/,
        channel_id = $/channel_id/,
        member_role_change = $/member_role_change/,
        member_nickname_change = $/member_nickname_change/,
        emoji_create = $/emoji_create/,
        emoji_update = $/emoji_update/,
        emoji_delete = $/emoji_delete/,
        role_create = $/role_create/,
        role_update = $/role_update/,
        role_delete = $/role_delete/
        WHERE guild_id = $/guild_id/
        RETURNING *`, settings);
    }
};