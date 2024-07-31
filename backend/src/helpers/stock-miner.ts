import yahooFinance from 'yahoo-finance2';
import { storePrice } from '../controllers/priceController';
import logger from './logger';

class StockMiner {
  private symbols: string[];

  constructor(symbols: string[]) {
    this.symbols = symbols;
  }

  public async pollData() {
    for (const symbol of this.symbols) {
      try {
        const quote = await yahooFinance.quote(symbol);
        const price = quote.regularMarketPrice;
        await storePrice(symbol, price);
        logger.info('price-polling-success', { symbol: symbol, price: price });
      } catch (error: any) {
        logger.error('price-polling-error', { symbol: symbol, msg: error.message, stack: error.stack });
      }
    }
  }

  public startPolling(interval: number) {
    this.pollData(); // Initial poll
    setInterval(() => this.pollData(), interval);
  }
}

export default StockMiner;
