const customCommandsDB = require('../models/customCommandsDB');

module.exports = {
  index(req, res, next) {
    customCommandsDB.findAll()
      .then(commands => {
        res.json({
          message: 'Getting Custom Commands',
          data: commands
        })
      })
      .catch(err => next(err));
  },
  getByUserId(req, res, next) {
    customCommandsDB.findByUserId(req.params.id)
      .then(commands => {
        res.json({
          message: "Getting Commands By User Id",
          data: commands
        })
      })
      .catch(err => next(err));
  },
  addCommand(req, res, next) {
    customCommandsDB.saveCommand(req.body)
      .then(command => {
        res.json({
          message: "Adding Command",
          data: command
        })
      })
      .catch(err => next(err));
  },
  updateCommand(req, res, next) {
    customCommandsDB.updateCommand(req.body)
      .then(command => {
        res.json({
          message: "Updating Command",
          data: command
        })
      })
      .catch(err => next(next));
  },
  deleteCommand(req, res, next) {
    customCommandsDB.destroy(req.params.id)
      .then(command => {
        res.json({
          message: "Deleteing Command",
          data: command
        })
      })
      .catch(err => next(err));
  }
};
