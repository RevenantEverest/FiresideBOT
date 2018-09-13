const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM default_commands');
  },
  findById(id) {
    return db.one('SELECT * FROM default_commands WHERE command_id = $1', id);
  }
}
