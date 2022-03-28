import express from 'express';
import { userPlaylistsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, validateId, validateDiscordId } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, userPlaylistsController.index)
.post(userPlaylistsController.create)

router.route("/id/:id")
.put(validateId, userPlaylistsController.update)
.delete(validateId, userPlaylistsController.destroy)

router.route("/discord_id/:discordId")
.get(extractPaginationParams, validateDiscordId, userPlaylistsController.getByDiscordId)

export default router;