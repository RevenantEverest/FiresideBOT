import express from 'express';
import topggRoutes from './topggRoutes.js';

const router = express.Router();

router.use("/topgg", topggRoutes);

export default router;