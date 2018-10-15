const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM users');
  },
  findById(id) {
    return db.one('SELECT * FROM users WHERE user_id = $1', id);
  },
  findByDiscordUsername(username) {
    return db.one('SELECT * FROM users WHERE discord_username = $1', username);
  },
  findByDiscordId(id) {
    return db.one('SELECT * FROM users WHERE discord_id = $1', id);
  },
  findByTwitchUsername(username) {
    return db.one('SELECT * FROM users WHERE twitch_username = $1', username);
  },
  seeIfDiscordIdExists(id) {
    return db.one('SELECT COUNT(*) FROM users WHERE discord_id = $1', id);
  },
  save(user) {
    return db.one('INSERT INTO users (discord_username, discord_id, twitch_username) VALUES ($/discord_username/, $/discord_id/, $/twitch_username/) RETURNING *', user);
  }
}
