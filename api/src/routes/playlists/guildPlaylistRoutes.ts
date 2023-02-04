import express from 'express';
import { guildPlaylistsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, guildPlaylistsController.index)

router.route("/guild_id/:guildId")
.get(extractPaginationParams, validation.guildId, permissions.isGuildMember, guildPlaylistsController.getByGuildId)
.post(validation.guildId, permissions.isGuildAdmin, guildPlaylistsController.create)

router.route("/guild_id/:guildId/id/:id")
.get(validation.guildId, validation.id, permissions.isGuildMember, guildPlaylistsController.getOne)
.put(validation.guildId, validation.id, permissions.isGuildAdmin, guildPlaylistsController.update)
.delete(validation.guildId, validation.id, permissions.isGuildAdmin, guildPlaylistsController.destroy)

router.route("/guild_id/:guildId/name/:name")
.get(validation.guildId, guildPlaylistsController.getByGuildIdAndPlaylistName)

export default router;