const db = require('../models/customCommandsDB');

module.exports = {
  index(req, res, next) {
    db.findAll()
    .then(commands => res.json({ message: 'Getting Custom Commands', data: commands }))
    .catch(err => next(err));
  },
  getByGuildId(req, res, next) {
    db.findByGuildId(req.params.id)
    .then(commands => res.json({ message: "Getting Commands By Guild Id", data: commands }))
    .catch(err => next(err));
  },
  getByDiscordId(req, res, next) {
    db.findByDiscordId(req.params.id)
    .then(commands => res.json({ message: "Getting Commands By User Id", data: commands }))
    .catch(err => next(err));
  },
  save(req, res, next) {
    db.save(req.body)
    .then(command => res.json({ message: "Saving Command", data: command }))
    .catch(err => next(err));
  },
  update(req, res, next) {
    db.update(req.body)
    .then(command => res.json({ message: "Updating Command", data: command }))
    .catch(err => next(err));
  },
  delete(req, res, next) {
    db.destroy(req.params.id)
    .then(() => res.json({ message: "Command Deleted" }))
    .catch(err => next(err));
  }
};
