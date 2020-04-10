const express = require('express');
const router = express.Router();

const config = require('../config/config');

router.route("/")
.get((req, res) => res.json({ message: "Getting Commands", data: config.commands.filter(el => el.category !== "Dev") }));

router.route("/name/:name")
.get((req, res) => {
    let command = config.commands.filter(el => el.name === req.params.name);
    res.json({ message: "Getting Command", data: command })
});

router.route("/category/:category")
.get((req, res) => {
    let category = config.Discord_Commands.filter(el => el.category === req.params.category);
    res.json({ message: "Getting Commands By Category", data: category })
});

module.exports = router;