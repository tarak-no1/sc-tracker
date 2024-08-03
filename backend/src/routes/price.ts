import express from 'express';
import { getPrices } from '../controllers/priceController';

const router = express.Router();

router.get('/:symbol', getPrices);

export default router;