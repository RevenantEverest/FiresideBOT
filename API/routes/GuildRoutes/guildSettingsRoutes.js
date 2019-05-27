const express = require('express');
const controller = require('../../controllers/GuildControllers/guildSettingsController');
const router = express.Router();

router.route("/")
.post(controller.create)
.put(controller.update)

router.route("/guild_id/:id")
.get(controller.getOneByGuildId)

module.exports = router;