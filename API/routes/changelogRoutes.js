const express = require('express');
const controller = require('../controllers/changelogsController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(verifyToken, controller.save)
.put(verifyToken, controller.update)

router.route("/id/:id")
.get(controller.getOne)
.delete(verifyToken, controller.delete)

module.exports = router;