import express from 'express';
import { saveTheater } from '../controllers/theater.controller.js';

const router = express.Router();

router.post('/add',saveTheater);

export default router;