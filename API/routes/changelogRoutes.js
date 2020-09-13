const express = require('express');
const controller = require('../controllers/changelogsController');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

router.route("/")
.get(controller.index)
.post(verifyAdminToken, controller.save)
.put(verifyAdminToken, controller.update)

router.route("/id/:id")
.get(controller.getOne)
.delete(verifyAdminToken, controller.delete)

module.exports = router;