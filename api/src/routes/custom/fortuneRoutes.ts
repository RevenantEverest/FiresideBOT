import express from 'express';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();
const validationMiddleware = [validation.guildId, validation.id];

router.route("/")
.get(extractPaginationParams)

router.route("/guild/:guildId")
.get(extractPaginationParams, validation.guildId, permissions.isGuildMember)
.post(validation.guildId, permissions.isGuildAdmin)

router.route("/guild/:guildId/id/:id")
.get(validationMiddleware, permissions.isGuildMember)
.delete(validationMiddleware, permissions.isGuildAdmin)

export default router;