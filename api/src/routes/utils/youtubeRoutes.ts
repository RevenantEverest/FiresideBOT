import express from 'express';
import { youtubeController } from '../../controllers/utils/index.js';

const router = express.Router();

router.route("/search/:request")
.get(youtubeController.search);

export default router;