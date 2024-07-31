import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

export const Price = mongoose.model('Price', priceSchema);