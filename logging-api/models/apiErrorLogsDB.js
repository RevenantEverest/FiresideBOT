const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM API_Error_Logs');
  },
  findById(id) {
    return db.one('SELECT * FROM API_Error_Logs WHERE id = $1', id);
  },
  save(log) {
    return db.one(`NSERT INTO API_Error_Logs (route, message, status_code)
    VALUES ($/route/, $/message/, $/status_code/)
    RETURNING *`, log)
  }
}
