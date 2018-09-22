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
      .catch(err => next(err));
  },
  getOne(req, res, next) {
    usersDB.findById(req.params.id)
      .then(user => {
        res.json({
          message: "Getting User",
          data: user
        })
      })
      .catch(err => next(err));
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
      .catch(err => next(err));
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
      .catch(err => next(err));
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
      .catch(err => next(err));
  },
  create(req, res, next) {
    usersDB.save(req.body)
      .then(user => {
        res.json({
          message: "Adding Users",
          data: user
        })
      })
      .catch(err => next(err));
  }
  // getUserSettings(req, res, next) {
  //   usersDB.findSettings(req.params.id)
  //     .then(settings => {
  //       res.json({
  //         message: "Getting user settings",
  //         data: settings
  //       })
  //     })
  //     .catch(err => next(err));
  // },
  // updateUserSettings(req, res, next) {
  //   usersDB.updateSettings(req.body)
  //     .then(settings => {
  //       res.json({
  //         message: "Updating User Settings",
  //         data: settings
  //       })
  //     })
  //     .catch(err => next(err));
  // }
};
