const express = require('express');
const controller = require('../controllers/commandLogsController');
const router = express.Router();

router.route("/")
.get(controller.index)

router.route("/guild_id/:id")
.get(controller.getByGuildId)

router.route("/command/:command")
.get(controller.getByCommand)

router.route("/top/guild/today")
.get(controller.getTopGuildsToday)

router.route("/top/guild/month")
.get(controller.getTopGuildsMonth)

router.route("/top/command/today")
.get(controller.getTopCommandsToday)

router.route("/top/command/month")
.get(controller.getTopCommandsMonth)

module.exports = router;