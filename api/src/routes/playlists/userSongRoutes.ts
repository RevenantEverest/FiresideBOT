import express from 'express';
import { userSongsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, validateId, validateDiscordId } from '../../middleware/index.js';

const router = express.Router();

router.route("/songs")
.get(extractPaginationParams, userSongsController.index)
.post(userSongsController.create)

router.route("/id/:playlistId/songs/id/:id")
.get(validateId, userSongsController.getOne)
.delete(validateId, userSongsController.destroy)

router.route("/id/:playlistId/songs")
.get(extractPaginationParams, validateId, userSongsController.getByUserPlaylistId)

export default router;