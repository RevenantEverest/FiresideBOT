const express = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = express.Router();

usersRouter.route('/')
  .get(usersController.index)
  .post(usersController.create)

usersRouter.route('/info/:id')
  .get(usersController.getOne)

usersRouter.route('/settings/:id')
  .get(usersController.getUserSettings)

usersRouter.route('/settings')
  .put(usersController.updateUserSettings)

module.exports = usersRouter;
