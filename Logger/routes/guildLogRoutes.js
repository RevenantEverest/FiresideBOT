const express = require('express');
const router = express.Router();
const controller = require('../controllers/guildLogsController');

router.route("/")
.get(controller.index)
.post(controller.create)

router.route("/log/:id")
.get(controller.getOne)
.delete(controller.delete)

module.exports = router;