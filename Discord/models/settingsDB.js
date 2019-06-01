const db = require('../config/connection');

module.exports = {
    findByGuildId(id) {
        return db.one(`SELECT * FROM guild_settings 
        JOIN currency_settings ON currency_settings.guild_id = guild_settings.guild_id 
        JOIN discord_rank_settings ON discord_rank_settings.guild_id = guild_settings.guild_id 
        WHERE guild_settings.guild_id = $1`, id);
    }
};