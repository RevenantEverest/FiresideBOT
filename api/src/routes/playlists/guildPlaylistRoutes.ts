import express from 'express';
import { guildPlaylistsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, validateId, validateGuildId, permissions } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildPlaylistsController.index)

router.route("/:guildId")
.get(extractPaginationParams, validateGuildId, guildPlaylistsController.getByGuildId)
.post(validateGuildId, permissions.isGuildAdmin, guildPlaylistsController.create)

router.route("/:guildId/id/:id")
.get(validateGuildId, validateId, guildPlaylistsController.getOne)
.put(validateGuildId, validateId, permissions.isGuildAdmin, guildPlaylistsController.update)
.delete(validateGuildId, validateId, permissions.isGuildAdmin, guildPlaylistsController.destroy)

export default router;