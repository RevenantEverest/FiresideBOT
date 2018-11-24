const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM API_Logs');
  },
  findById(id) {
    return db.one('SELECT * FROM API_Logs WHERE id = $1', id);
  },
  save(log) {
    return db.one(`INSERT INTO API_Logs (route, message)
    VALUES ($/route/, $/message/)
    RETURNING *`, log);
  }
}
