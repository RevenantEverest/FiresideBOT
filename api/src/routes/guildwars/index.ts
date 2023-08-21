import express from 'express';
import guildwarsEventRoutes from './guildwarsEventRoutes.js';
import guildwarsEventSignupRoutes from './guildwarsEventSignupRoutes.js';

const router = express.Router();

router.use("/events", guildwarsEventRoutes);
router.use("/events/signups", guildwarsEventSignupRoutes);

export default router;