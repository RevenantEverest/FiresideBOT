import express from 'express';
import loginRoutes from './loginRoutes.js';

const router = express.Router();

router.use("/login", loginRoutes);

export default router;