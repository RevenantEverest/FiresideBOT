const db = require('../config/connection');

module.exports = {
  saveDefaultSettings(settings) {
    return db.one(`INSERT INTO currency_settings (guild_id, currency_name, currency_increase_rate)
    VALUES($/guild_id/, $/currency_name/, $/currency_increase_rate/)
    RETURNING *`, settings);
  },
  updateCurrencySettings(settings) {
    return db.one(`UPDATE currency_settings
      SET
      currency_name = $/currency_name/,
      currency_increase_rate = $/currency_increase_rate/
      WHERE guild_id = $/guild_id/
      RETURNING *`, settings);
  },
  updateCurrencyName(settings) {
    return db.one(`UPDATE currency_settings
    SET
    currency_name = $/currency_name/
    WHERE guild_id = $/guild_id/
    RETURNING *`, settings);
  },
  updateCurrencyIncreaseRate(settings) {
    return db.one(`UPDATE currency_settings
    SET
    currency_increase_rate = $/currency_increase_rate/
    WHERE guild_id = $/guild_id/
    RETURNING *`, settings);
  },
  findCurrencySettings(guild_id) {
    return db.one('SELECT * FROM currency_settings WHERE guild_id = $1', guild_id);
  }
}
