const express = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = express.Router();

loginRouter.route("/discord/token")
.post(loginController.login);

loginRouter.route("/discord/user/:id")
.get(loginController.getUserByDiscordId);

loginRouter.route("/discord/logout")
.post(loginController.handleLogout);

module.exports = loginRouter;
