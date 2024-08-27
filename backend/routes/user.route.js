import express from 'express';
import { signOut } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signout',signOut);

export default router;