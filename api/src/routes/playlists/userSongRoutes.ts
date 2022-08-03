import express from 'express';
import { userSongsController } from '../../controllers/playlists/index.js';
import { extractPaginationParams, validation } from '../../middleware/index.js';

const router = express.Router();

router.route("/songs")
.get(extractPaginationParams, userSongsController.index)
.post(userSongsController.create)

router.route("/id/:playlistId/songs/id/:id")
.get(validation.id, userSongsController.getOne)
.delete(validation.id, userSongsController.destroy)

router.route("/id/:playlistId/songs")
.get(extractPaginationParams, validation.id, userSongsController.getByUserPlaylistId)

export default router;