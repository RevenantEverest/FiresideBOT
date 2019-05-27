const db = require('../../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM bot_guilds');
  },
  findById(id) {
    return db.one('SELECT * FROM bot_guilds WHERE guild_id = $1', id)
  },
  save(guild) {
    return db.one('INSERT INTO bot_guilds (guild_name, guild_id) VALUES ($/guild_name/, $/guild_id/) RETURNING *', guild);
  },
  destroy(id) {
    return db.none('DELETE FROM bot_guilds WHERE guild_id = $1', id);
  }
}
