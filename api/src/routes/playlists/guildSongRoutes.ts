import express from 'express';
import { guildSongsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();
const validationMiddleware = [validation.guildId, validation.id];

router.route("/songs")
.get(extractPaginationParams, guildSongsController.index)

router.route("/:guildId/id/:playlistId/songs")
.get(extractPaginationParams, validationMiddleware, permissions.isGuildMember, guildSongsController.getByGuildPlaylistId)
.post(validationMiddleware, permissions.hasGuildPlaylistRole, guildSongsController.create)

router.route("/:guildId/id/:playlistId/songs/id/:id")
.get(validationMiddleware, permissions.isGuildMember, guildSongsController.getOne)
.delete(validationMiddleware, permissions.hasGuildPlaylistRole, guildSongsController.destroy)

export default router;