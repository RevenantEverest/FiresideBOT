const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM bot_guilds');
  },
  findById(id) {
    return db.one('SELECT * FROM bot_guilds WHERE guild_id = $1', id)
  },
  ifExists(id) {
    return db.one('SELECT COUNT(*) FROM bot_guilds WHERE guild_id = $1', id);
  },
  save(guild) {
    return db.one('INSERT INTO bot_guilds (guild_name, guild_id) VALUES ($/guild_name/, $/guild_id/) RETURNING *', guild);
  },
  destroy(id) {
    return db.none('DELETE FROM bot_guilds WHERE guild_id = $1', id);
  },

  /* ======== Settings ======== */
  findSettings(id) {
    return db.one('SELECT * FROM guild_settings WHERE guild_id = $1', id);
  },
  findPrefix(id) {
    return db.one('SELECT prefix FROM guild_settings WHERE guild_id = $1', id);
  },
  ifSettingsExist(id) {
    return db.one('SELECT COUNT(*) FROM guild_settings WHERE guild_id = $1', id);
  },
  saveDefaultSettings(settings) {
    return db.one(`INSERT INTO guild_settings (guild_id, prefix)
      VALUES($/guild_id/, $/prefix/) RETURNING *`, settings);
  },
  updateSettings(settings) {
    return db.one(`UPDATE guild_settings SET prefix = $/prefix/
      WHERE guild_id = $/guild_id/ RETURNING *`, settings);
  }
}
