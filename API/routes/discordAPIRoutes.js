const express = require('express');
const discordAPIController = require('../controllers/discordAPIController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.route("/user/guilds/:id")
.get(verifyToken, discordAPIController.getGuilds)

router.route("/user/info/:id")
.get(verifyToken, discordAPIController.getUserInfo)

router.route("/bot/users/size")
.get(discordAPIController.getBotUserSize)

router.route("/guilds/channels/:id")
.get(verifyToken, discordAPIController.getGuildTextChannels)

router.route("/guilds/roles/:id")
.get(verifyToken, discordAPIController.getGuildRoles)

module.exports = router;