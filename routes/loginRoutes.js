const express = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = express.Router();

loginRouter.route("/discord/token")
.post(loginController.handleLogin);

loginRouter.route("/discord/user/:id")
.get(loginController.getUserByDiscordId);

loginRouter.route("/discord/logout/:id")
.delete(loginController.handleLogout);

module.exports = loginRouter;
