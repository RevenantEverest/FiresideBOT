const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM command_logs');
  },
  findById(id) {
    return db.one('SELECT * FROM command_logs WHERE id = $1', id);
  },
  save(log) {
    return db.one(`INSERT INTO command_logs (command, args, message, user_id, guild_id, log_date)
    VALUES ($/command/, $/args/, $/message/, $/user_id/, $/guild_id/, $/log_date/)
    RETURNING *`, log);
  }
}
