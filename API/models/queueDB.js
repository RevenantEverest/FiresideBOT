const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.many(`SELECT * FROM twitch_queue`);
  },
  findById(id) {
    return db.one(`SELECT * FROM twitch_queue WHERE id = $1`, id);
  },
  checkForChannelQueue(channel) {
    return db.one('SELECT COUNT(*) FROM twitch_queue WHERE channel = $1', channel);
  },
  findByChannel(channel) {
    return db.many(`SELECT * FROM twitch_queue WHERE channel = $1`, channel);
  },
  save(request) {
    return db.one(`INSERT INTO twitch_queue (channel, title, link, duration)
      VALUES ($/channel/, $/title/, $/link/, $/duration/) RETURNING *`, request);
  },
  destroy(id) {
    return db.none('DELETE FROM twitch_queue WHERE id = $1', id);
  }
}
