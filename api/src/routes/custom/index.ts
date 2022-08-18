import express from 'express';
import fortuneRoutes from './fortuneRoutes.js';

const router = express.Router();

router.use("/fortunes", fortuneRoutes);

export default router;