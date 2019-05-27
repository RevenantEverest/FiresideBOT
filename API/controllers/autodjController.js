const autodjDB = require('../models/autodjDB');

module.exports = {
  index(req, res, next) {
    autodjDB.findAll()
    .then(results => res.json({ message: "Getting autodj settings", data: results }))
    .catch(err => next(err));
  },
  getOne(req, res, next) {
    autodjDB.findById(req.params.id)
    .then(results => res.json({ message: 'Getting autodk settings by id', data: results }))
    .catch(err => next(err));
  },
  getByUserId(req, res, next) {
    autodjDB.findByUserId(req.params.id)
    .then(results => res.json({ message: "Getting autodj settings by user id", data: results }))
    .catch(err => next(err));
  },
  create(req, res, next) {
    autodjDB.save(req.body)
    .then(results => res.json({message: "Saving AutoDJ Setttings", data: results }))
    .catch(err => next(err));
  },
  update(req, res, next) {
    autodjDB.updateByUserId(req.body)
    .then(results => res.json({ message: "Updating autodj settings", data: results }))
    .catch(err => next(err));
  },
  updateRedirect(req, res, next) {
    autodjDB.updateRedirectByUserId(req.body)
    .then(results => res.json({ message: 'Updating Redirect', data: results }))
    .catch(err => next(err));
  },
  updateGuildId(req, res, next) {
    autodjDB.updateGuildIdByUserId(req.body)
    .then(results =>  res.json({ message: "Updating Guild ID", data: results }))
    .catch(err => next(err));
  }
};
