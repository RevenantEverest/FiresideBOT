const express = require('express');
const controller = require('../controllers/discordRankRecordsController');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(controller.create)
.put(controller.update)

router.route("/guild_id/:id")
.get(controller.getByGuildId)

router.route("/discord_id/:id")
.get(controller.getByDiscordId)
.delete(controller.deleteByDiscordId)

router.route("/id/:id")
.get(controller.getOne)
.delete(controller.delete)

module.exports = router;