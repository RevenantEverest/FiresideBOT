import express from 'express';
import userPlaylistRoutes from './userPlaylistRoutes.js';
import userSongRoutes from './userSongRoutes.js';

const router = express.Router();

router.use("/user", userPlaylistRoutes);
router.use("/user", userSongRoutes);

export default router;