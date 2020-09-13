const express = require('express');
const controller = require('../../controllers/AdminControllers/commandLogsController');
const router = express.Router();

router.route("/")
.get(controller.index)

router.route("/guild_id/:id")
.get(controller.getByGuildId)

router.route("/guild_id/:id/top/command/today")
.get(controller.getTopCommandsTodayByGuild)

router.route("/guild_id/:id/top/command/month")
.get(controller.getTopCommandsMonthByGuild)

router.route("/guild_id/:id/overtime")
.get(controller.getCommandsOverTimeByGuild)

router.route("/guild_id/:id/month")
.get(controller.getCommandsTodayByGuild)

router.route("/guild_id/:id/week")
.get(controller.getCommandsWeekByGuild)

router.route("/guild_id/:id/today")
.get(controller.getCommandsMonthByGuild)

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

router.route("/overtime")
.get(controller.getCommandsOverTime)

router.route("/month")
.get(controller.getCommandsToday)

router.route("/week")
.get(controller.getCommandsWeek)

router.route("/today")
.get(controller.getCommandsToday)

module.exports = router;