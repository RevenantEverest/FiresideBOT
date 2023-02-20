import express from 'express';
import guildCurrencyRecordRoutes from './guildCurrencyRecordRoutes.js';

const router = express.Router();

router.use("/currency/guild", guildCurrencyRecordRoutes);

router.route("/").get((req, res) => res.json({ message: "Hello" }))

export default router;