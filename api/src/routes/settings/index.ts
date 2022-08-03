import express from 'express';

import guildSettingRoutes from './guildSettingRoutes.js';

const router = express.Router();

router.use("/guild", guildSettingRoutes);

export default router;