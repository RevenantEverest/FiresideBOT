
import express from 'express';
import { guildSettingsController } from '../../controllers/settings/index.js';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildSettingsController.index)

router.route("/:guildId")
.get(validation.guildId, permissions.isGuildMember, guildSettingsController.getByGuildId)
.post(validation.guildId, permissions.isGuildAdmin, guildSettingsController.create)
.put(validation.guildId, permissions.isGuildAdmin, guildSettingsController.update)

router.route("/:guildId/id/:id")
.get(validation.id, validation.guildId, permissions.isGuildAdmin, guildSettingsController.getOne)

export default router;