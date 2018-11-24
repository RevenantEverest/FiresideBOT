const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiErrorLogsController');

router.route("/")
.get(controller.index)
.post(controller.create)

router.route("/:id")
.get(controller.getOne)

module.exports = router;
