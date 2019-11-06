const express = require('express');
const controller = require('../controllers/customCommandsController');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(controller.save)
.put(controller.update)

router.route("/discord_id/:id")
.get(controller.getByDiscordId)

router.route("/guild_id/:id")
.get(controller.getByGuildId)

router.route("/delete/:id")
.delete(controller.delete)



module.exports = router;
