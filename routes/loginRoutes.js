const express = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = express.Router();

loginRouter.route("/discord/token")
.post(loginController.handleLogin)

module.exports = loginRouter;
