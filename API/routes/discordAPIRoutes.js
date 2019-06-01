const express = require('express');
const discordAPIController = require('../controllers/discordAPIController');
const router = express.Router();

router.route("/user/guilds/:id")
.get(discordAPIController.getGuilds)

router.route("/user/info/:id")
.get(discordAPIController.getUserInfo)

router.route("/bot/users/size")
.get(discordAPIController.getBotUserSize)

router.route("/guilds/channels/:id")
.get(discordAPIController.getGuildTextChannels)

router.route("/guilds/roles/:id")
.get(discordAPIController.getGuildRoles)

module.exports = router;