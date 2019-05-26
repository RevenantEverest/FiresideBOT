const express = require('express');
const regularsController = require('../controllers/regularsController');
const regularsRouter = express.Router();

regularsRouter.route('/')
.get(regularsController.index)
.post(regularsController.create)
.put(regularsController.update)

regularsRouter.route('/regular_id/:id')
.get(regularsController.getOne)
.delete(regularsController.delete)

regularsRouter.route('/channel/:channel')
.get(regularsController.getByChannelName)

module.exports = regularsRouter;
