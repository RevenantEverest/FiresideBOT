const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM custom_commands');
  },
  findByUserId(id) {
    return db.many('SELECT * FROM custom_commands WHERE user_id = $1', id);
  },
  findCommand(command) {
    return db.one('SELECT COUNT($/input/) FROM custom_commands WHERE guild_id = $/guild_id/', command);
  },
  getCommandByInput(command) {
    return db.one('SELECT * FROM custom_commands WHERE input = $/input/ AND guild_id = $/guild_id/', command)
  },
  saveCommand(command) {
    return db.one(`INSERT INTO custom_commands (user_id, command, output)
    VALUES($/user_id/, $/command/, $/output/)
    RETURNING *`, command);
  },
  updateCommand(command) {
    return db.one(`UPDATE custom_commands
    SET
    command = $/command/,
    output = $/output/,
    WHERE command_id = $/command_id/
    RETURNING *`, command);
  },
  destroy(id) {
    return db.none('DELETE FROM custom_commands WHERE command_id = $1', id);
  }
}
