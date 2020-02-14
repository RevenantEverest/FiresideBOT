const express = require('express');
const controller = require('../controllers/newGuildMembersController');
const router = express.Router();

router.route("/guild_id/:id")
.get(controller.getNewGuildMembers)

module.exports = router;