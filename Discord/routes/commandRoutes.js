const express = require('express');
const controller = require('../controllers/commandController');
const router = express.Router();

router.route("/")
.get(controller.index)

router.route("/name/:name")
.get(controller.getOne)

router.route("/category/:category")
.get(controller.getByCategory)

module.exports = router;