import express from 'express';
import cors from 'cors';
import mongoClient from './src/helpers/mongo-client';
import priceRoutes from './src/routes/price';
import { handle404ErrorResponse } from './src/middlewares/common';
import config from './config';
import StockMiner from './src/helpers/stock-miner';
import logger from './src/helpers/logger';

process.on('uncaughtException', (error: Error) => {
  logger.error('uncaught-exception', { msg: error.message, stack: error.stack });
  // terminate the service
  process.exit(0);
});

process.on('unhandledRejection', (reason: any) => {
  logger.error('unhandled-rejection', { msg: reason.message, stack: reason.stack});
});

// Connect to the MongoDB database
mongoClient.connect();

// Create an Express application instance
const app = express();
// Get the port number from the configuration file
const PORT = config.getString('server', 'app_port', '5000');

// Enable CORS for all origins
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Mount the price routes at the '/api/prices' endpoint
app.use('/api/prices', priceRoutes);

// Handle 404 (Not Found) errors
app.use(handle404ErrorResponse);

// Define an array of stock symbols to track
const symbols = ['GOOG', 'BTC-USD', 'ETH-USD', 'AAPL', 'TSLA'];
// Get the polling interval from the configuration file, defaulting to 5 seconds
const pollInterval = config.getNumber('server', 'poll_interval', 5000); 

// Create a new StockMiner instance with the specified symbols
const stockMiner = new StockMiner(symbols);
// Start polling for stock prices at the specified interval
// stockMiner.startPolling(pollInterval);

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
