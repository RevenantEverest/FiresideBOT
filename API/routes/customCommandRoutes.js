const express = require('express');
const controller = require('../controllers/customCommandsController');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(controller.save)
.put(controller.update)

router.route("/id/:id")
.get(controller.getOne)

router.route("/discord_id/:id")
.get(controller.getByDiscordId)

router.route("/guild_id/:id")
.get(controller.getByGuildId)

router.route("/discord_id/:discord_id/guild_id/:guild_id")
.get(controller.getByDiscordIdAndGuildId)

router.route("/id/:id")
.delete(controller.delete)



module.exports = router;
