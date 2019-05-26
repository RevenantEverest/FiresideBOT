const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM discord_currency');
  },
  findById(id) {
    return db.one('SELECT * FROM discord_currency WHERE id = $1', id);
  },
  findByDiscordId(id) {
    return db.one('SELECT * FROM discord_currency WHERE discord_id = $1', id);
  },
  findByGuildId(id) {
    return db.many('SELECT * FROM discord_currency WHERE guild_id = $1 ORDER BY currency DESC', id);
  },
  findByDiscordIdAndGuildId(id) {
    return db.one('SELECT * FROM discord_currency WHERE discord_id = $/discord_id/ AND guild_id = $/guild_id/', id);
  },
  save(currency) {
    return db.one(`INSERT INTO discord_currency (discord_id, guild_id, currency)
    VALUES ($/discord_id/, $/guild_id/, $/currency/)
    RETURNING *`, currency);
  },
  update(currency) {
    return db.one(`UPDATE discord_currency
      SET
      currency = $/currency/
      WHERE discord_id = $/discord_id/ AND guild_id = $/guild_id/
      RETURNING *`, currency);
  },
  delete(id) {
    return db.none('DELETE FROM discord_currency WHERE id = $1', id);
  }
};
