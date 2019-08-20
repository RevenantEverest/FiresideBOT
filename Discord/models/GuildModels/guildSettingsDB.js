const db = require('../../config/connection');

module.exports = {
    findByGuildId(id) {
        return db.one('SELECT * FROM guild_settings JOIN disabled_commands ON disabled_commands.guild_id = guild_settings.guild_id WHERE guild_settings.guild_id = $1', id);
    }
};