const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM autodj');
  },
  findById(id) {
    return db.one('SELECT * FROM autodj WHERE id = $1', id);
  },
  findByUserId(id) {
    return db.one('SELECT * FROM autodj WHERE user_id = $1', id);
  },
  findByChannelName(channel) {
    return db.one('SELECT * FROM sutodj WHERE channel = $1', channel);
  },
  save(settings) {
    return db.one(`INSERT INTO autodj (user_id, redirect, guild_id)
    VALUES ($/user_id/, $/redirect/, $/guild_id/) RETURNING *`, settings);
  },
  updateByUserId(update) {
    return db.one(`UPDATE autodj SET
      redirect = $/redirect/,
      guild_id = $/guild_id/
      WHERE user_id = $/user_id/
      RETURNING *`, update);
  },
  updateRedirectByUserId(update) {
    return db.one(`UPDATE autodj SET
      redirect = $/redirect/ WHERE user_id = $/user_id/ RETURNING *`, update);
  },
  updateGuildIdByUserId(update) {
    return db.one(`UPDATE autodj SET
      guild_id = $/guild_id/ WHERE user_id = $/user_id/ RETURNING *`, update);
  }
};
