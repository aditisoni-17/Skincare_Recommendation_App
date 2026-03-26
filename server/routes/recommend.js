import express from 'express';
import { recommendProducts } from '../controllers/recommendController.js';

const router = express.Router();

router.post('/', recommendProducts);

export default router;
