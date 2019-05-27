const usersDB = require('../../models/UserModels/usersDB');

module.exports = {
  index(req, res, next) {
    usersDB.findAll()
    .then(users => res.json({message: "Getting Users", data: users }))
    .catch(err => next(err));
  },
  getOne(req, res, next) {
    usersDB.findById(req.params.id)
    .then(user => res.json({message: "Getting User", data: user}))
    .catch(err => next(err));
  },
  getByDiscordUsername(req, res, next) {
    usersDB.findByDiscordUsername(req.params.username)
    .then(user => res.json({message: "Getting user by discord username", data: user }))
    .catch(err => next(err));
  },
  getByDiscordId(req, res, next) {
    usersDB.findByDiscordId(req.params.id)
    .then(user => res.json({message: "Getting user by discord id", data: user }))
    .catch(err => next(err));
  },
  getByTwitchUsername(req, res, next) {
    usersDB.findByTwitchUsername(req.params.username)
    .then(user => res.json({ message: "Getting user by Twitch username", data: user }))
    .catch(err => next(err));
  },
  create(req, res, next) {
    usersDB.save(req.body)
    .then(user => res.json({ message: "Adding Users", data: user }))
    .catch(err => next(err));
  }
};
