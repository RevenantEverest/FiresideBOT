import express from 'express';
import { guildPlaylistRolesController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, permissions, validation } from '../../middleware/index.js';

const router = express.Router();

const validationMiddleware = [validation.guildId, validation.id];

router.route("/roles")
.get(extractPaginationParams, guildPlaylistRolesController.index)

router.route("/guild_id/:guildId/id/:playlistId/roles")
.get(extractPaginationParams, validationMiddleware, permissions.isGuildMember, guildPlaylistRolesController.getByGuildIdAndPlaylistId)
.post(validationMiddleware, permissions.isGuildAdmin, guildPlaylistRolesController.create)

router.route("/guild_id/:guildId/id/:playlistId/roles/id/:roleId")
.get(validationMiddleware, permissions.isGuildMember, guildPlaylistRolesController.getOne)
.delete(validationMiddleware, validation.roleId, permissions.isGuildAdmin, guildPlaylistRolesController.destroy)

export default router;