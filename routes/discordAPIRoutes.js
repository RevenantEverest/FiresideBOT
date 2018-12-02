const express = require('express');
const discordAPIController = require('../controllers/discordAPIController');
const router = express.Router();

router.route("/guilds/:id")
.get(discordAPIController.getGuilds)

router.route("/user/info/:id")
.get(discordAPIController.getUserInfo)

router.route("/bot/users/size")
.get(discordAPIController.getBotUserSize)

module.exports = router;