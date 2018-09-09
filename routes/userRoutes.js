const express = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = express.Router();

usersRouter.route('/')
  .get(usersController.index)
  .post(usersController.create)

module.exports = usersRouter;
