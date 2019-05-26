const express = require('express');
const controller = require('../controllers/discordRankSettingsController');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(controller.create)
.put(controller.update)

router.route("/guild_id/:id")
.get(controller.getByGuildId)

router.route("/id/:id")
.get(controller.getOne)

module.exports = router;