import express from 'express';

import guildPlaylistRoutes from './guildPlaylistRoutes.js';
import guildPlaylistRoleRoutes from './guildPlaylistRoleRoutes.js';

import userPlaylistRoutes from './userPlaylistRoutes.js';
import userSongRoutes from './userSongRoutes.js';

const router = express.Router();

router.use("/guild", guildPlaylistRoutes);
router.use("/guild", guildPlaylistRoleRoutes);

router.use("/user", userPlaylistRoutes);
router.use("/user", userSongRoutes);

export default router;