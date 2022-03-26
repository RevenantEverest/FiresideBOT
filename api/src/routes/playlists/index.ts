import express from 'express';
import userPlaylistRoutes from './userPlaylistRoutes.js';

const router = express.Router();

router.use("/user", userPlaylistRoutes);

export default router;