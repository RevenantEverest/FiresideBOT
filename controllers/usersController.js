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
};
