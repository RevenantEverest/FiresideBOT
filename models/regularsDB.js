const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many('SELECT * FROM regulars');
  },
  findById(id) {
    return db.oneOrNone('SELECT * FROM regulars WHERE regular_id = $1', id);
  },
  findByChannelName(channel) {
    return db.many('SELECT * FROM regulars WHERE channel = $1', channel);
  },
  save(regular) {
    return db.one(`INSERT INTO regulars(channel, regular_username)
    VALUES($/channel/, $/regular_username/)
    RETURNING *`, regular);
  },
  update(regular) {
    return db.one(`UPDATE regulars
    SET
    channel = $/channel/,
    regular_username = $/regular_username/
    WHERE regular_id = $/regular_id/
    RETURNING *`, regular);
  },
  delete(id) {
    return db.none('DELETE FROM regulars WHERE regular_id = $1', id);
  }
}
