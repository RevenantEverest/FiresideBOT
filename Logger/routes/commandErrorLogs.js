const express = require('express');
const controller = require('../controllers/commandErrorLogsController');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(controller.save)

router.route("/:id")
.get(controller.getOne)

module.exports = router;