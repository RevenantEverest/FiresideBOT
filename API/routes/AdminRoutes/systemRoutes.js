const express = require('express');
const controller = require('../../controllers/AdminControllers/systemCommandsController');
const router = express.Router();

router.route("/restart")
.post(controller.restart)

router.route("/restart/service/:service")
.post(controller.restart)

router.route("/stop")
.post(controller.stop)

router.route("/stop/service/:service")
.post(controller.stop)

router.route("/start")
.post(controller.start)

router.route("/start/service/:service")
.post(controller.start)

router.route("/process/info")
.get(controller.getProcessInfo)

module.exports = router;