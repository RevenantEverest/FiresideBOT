const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM Command_Logs');
  },
  findById(id) {
    return db.one('SELECT * FROM Command_Logs WHERE id = $1', id);
  },
  save(log) {
    return db.one(`INSERT INTO Command_Logs (command, args, message, user_id, guild_id)
    VALUES ($/command/, $/args/, $/message/, $/user_id/, $/guild_id/)
    RETURNING *`, log);
  }
}
