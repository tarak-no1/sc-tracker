import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/custom';
import { Price } from '../models/Price';

export const getPrices = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { symbol } = req.query;
  const prices = await Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(prices);
};

export const storePrice = async (symbol: string, price?: number) => {
  const newPrice = new Price({ symbol, price });
  await newPrice.save();
};
