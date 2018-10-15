const usersDB = require('../models/usersDB');

module.exports = {
  index(req, res, next) {
    usersDB.findAll()
      .then(users => {
        res.json({
          message: "Getting Users",
          data: users
        })
      })
      .catch(err => { console.log("Failed at Users Index"); next(); });
  },
  getOne(req, res, next) {
    usersDB.findById(req.params.id)
      .then(user => {
        res.json({
          message: "Getting User",
          data: user
        })
      })
      .catch(err => { console.log("Failed at Users Get One"); next(); });
  },
  //Get By Discord Username
  getByDiscordUsername(req, res, next) {
    usersDB.findByDiscordUsername(req.params.username)
      .then(user => {
        res.json({
          message: "Getting user by discord username",
          data: user
        })
      })
      .catch(err => { console.log("Failed at Users Get By Discord Username"); next(); });
  },
  //Get By Discord ID
  getByDiscordId(req, res, next) {
    usersDB.findByDiscordId(req.params.id)
      .then(user => {
        res.json({
          message: "Getting user by discord id",
          data: user
        })
      })
      .catch(err => { console.log("Failed at Users Get By Discord Id"); next(); });
  },
  //Get By Twitch Username
  getByTwitchUsername(req, res, next) {
    usersDB.findByTwitchUsername(req.params.username)
      .then(user => {
        res.json({
          message: "Getting user by Twitch username",
          data: user
        })
      })
      .catch(err => { console.log("Failed at Users Get By Twitch Username"); next(); });
  },
  create(req, res, next) {
    usersDB.save(req.body)
      .then(user => {
        res.json({
          message: "Adding Users",
          data: user
        })
      })
      .catch(err => { console.log("Failed at Users Create"); next(); });
  }
};
