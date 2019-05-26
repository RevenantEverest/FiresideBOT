const express = require('express');
const customCommandsController = require('../controllers/customCommandsController');
const customCommandsRouter = express.Router();

customCommandsRouter.route('/')
  .get(customCommandsController.index)
  .post(customCommandsController.addCommand)
  .put(customCommandsController.updateCommand)

customCommandsRouter.route('/user/:id')
  .get(customCommandsController.getByUserId)

customCommandsRouter.route('/delete/:id')
  .delete(customCommandsController.deleteCommand)



module.exports = customCommandsRouter;
