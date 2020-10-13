const express = require('express');
const controller = require('../../controllers/GuildControllers/guildAnalyticsController');
const router = express.Router();

router.route("/id/:id/commands/top/today")
.get(controller.getTopCommandsToday)

router.route("/id/:id/commands/top/Month")
.get(controller.getTopCommandsThisMonth)

router.route("/id/:id/commands/overtime")
.get(controller.getCommandsOvertime)

router.route("/id/:id/commands/today")
.get(controller.getCommandsToday)

router.route("/id/:id/commands/week")
.get(controller.getCommandsThisWeek)

router.route("/id/:id/commands/month")
.get(controller.getCommandsThisMonth)

module.exports = router;