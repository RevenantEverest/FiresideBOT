import express from 'express';
import { userPlaylistsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, validation } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, userPlaylistsController.index)
.post(userPlaylistsController.create)

router.route("/id/:id")
.get(validation.id, userPlaylistsController.getOne)
.put(validation.id, userPlaylistsController.update)
.delete(validation.id, userPlaylistsController.destroy)

router.route("/discord_id/:discordId")
.get(extractPaginationParams, validation.discordId, userPlaylistsController.getByDiscordId)

export default router;