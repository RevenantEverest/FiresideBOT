const express = require('express');
const controller = require('../controllers/loginAdminController');
const router = express.Router();

router.route("/")
.post(controller.loginAdmin)

module.exports = router;