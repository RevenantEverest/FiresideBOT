const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM CommandError_Logs');
  },
  findById(id) {
    return db.one('SELECT * FROM CommandError_Logs WHERE id = $1', id);
  },
  save(log) {
    return db.one(`INSERT INTO CommandError_Logs (command, args, message, error, user_id, guild_id)
    VALUES ($/command/, $/args/, $/message/, $/error/, $/user_id/, $/guild_id/)
    RETURNING *`, log);
  }
}
