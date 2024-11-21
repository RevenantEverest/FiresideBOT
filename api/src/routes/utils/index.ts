import express from 'express';
import youtubeRoutes from './youtubeRoutes.js';

const router = express.Router();

router.use("/youtube", youtubeRoutes);

export default router;