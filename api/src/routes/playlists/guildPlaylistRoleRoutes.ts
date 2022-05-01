import express from 'express';
import { guildPlaylistRolesController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, permissions, validateGuildId, validateId } from '../../middleware/index.js';

const router = express.Router();

const validationMiddleware = [validateGuildId, validateId];

router.route("/roles")
.get(extractPaginationParams, guildPlaylistRolesController.index)

router.route("/:guildId/id/:id/roles")
.get(extractPaginationParams, validationMiddleware, permissions.isGuildMember, guildPlaylistRolesController.getByGuildId)
.post(validationMiddleware, permissions.isGuildAdmin, guildPlaylistRolesController.create)

router.route("/:guildId/id/:playlistId/roles/id/:id")
.get(validationMiddleware, permissions.isGuildMember, guildPlaylistRolesController.getOne)
.delete(validationMiddleware, permissions.isGuildAdmin, guildPlaylistRolesController.destroy)

export default router;