import express from 'express';
import { loginController } from '../../controllers/auth/index.js';

const router = express.Router();

router.route("/")
.post(loginController.login);

export default router;