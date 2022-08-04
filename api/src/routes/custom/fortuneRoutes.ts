import express from 'express';
import { fortunesController } from '../../controllers/custom/index.js';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();
const validationMiddleware = [validation.guildId, validation.id];

router.route("/")
.get(extractPaginationParams, fortunesController.index)

router.route("/guild/:guildId")
.get(extractPaginationParams, validation.guildId, permissions.isGuildMember, fortunesController.getByGuildId)
.post(validation.guildId, permissions.isGuildAdmin, fortunesController.create)

router.route("/guild/:guildId/id/:id")
.get(validationMiddleware, permissions.isGuildMember, fortunesController.getOne)
.delete(validationMiddleware, permissions.isGuildAdmin, fortunesController.destroy)

export default router;