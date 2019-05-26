const express = require('express');
const controller = require('../controllers/discordRanksController');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(controller.create)
.put(controller.update)

router.route("/id/:id")
.get(controller.getOne)
.delete(controller.delete)

router.route("/guild_id/:id")
.get(controller.getByGuildId)

module.exports = router;