import express from 'express';
import { guildPlaylistsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildPlaylistsController.index)

router.route("/:guildId")
.get(extractPaginationParams, validation.guildId, guildPlaylistsController.getByGuildId)
.post(validation.guildId, permissions.isGuildAdmin, guildPlaylistsController.create)

router.route("/:guildId/id/:id")
.get(validation.guildId, validation.id, guildPlaylistsController.getOne)
.put(validation.guildId, validation.id, permissions.isGuildAdmin, guildPlaylistsController.update)
.delete(validation.guildId, validation.id, permissions.isGuildAdmin, guildPlaylistsController.destroy)

export default router;