const express = require('express');
const queueRouter = express.Router();
const queueController = require('../controllers/queueController');

queueRouter.route('/')
.get(queueController.index)
.post(queueController.create);

queueRouter.route('/channel/:channel')
.get(queueController.getByChannel);

queueRouter.route('/info/:id')
.get(queueController.getOne)
.delete(queueController.delete);

module.exports = queueRouter;
