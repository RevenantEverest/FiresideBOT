import express from 'express';
import { userPlaylistsController } from '../../controllers/playlists/index.js';
import { validateId } from '../../middleware/index.js';

const router = express.Router();

router.route("/")
.post(userPlaylistsController.create)

router.route("/:id")
.put(validateId, userPlaylistsController.update)
.delete(validateId, userPlaylistsController.destroy)

export default router;