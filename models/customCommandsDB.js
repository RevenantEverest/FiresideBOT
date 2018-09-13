const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM custom_commands');
  },
  findByUserId(id) {
    return db.many('SELECT * FROM custom_commands WHERE user_id = $1', id);
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
    output = $//,
    WHERE command_id = $/command_id/
    RETURNING *`, command);
  },
  destroy(id) {
    return db.none('DELETE FROM custom_commands WHERE command_id = $1', id);
  }
}
