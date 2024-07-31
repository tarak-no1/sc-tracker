import mongoose from 'mongoose'; // Import the Mongoose library for interacting with MongoDB
import config from '../../config'; // Import the configuration file for application settings
import logger from './logger'; // Import the logger helper for logging messages

const mongoURI = config.getString('mongo_db', 'uri', '');
const dbName = config.getString('mongo_db', 'db_name', 'sc_tracker');

class MongoClient {
  private static instance: MongoClient;
  private mongoURI: string;
  private options: mongoose.ConnectOptions;

  private constructor() {
    // Construct the full MongoDB URI by combining the URI and database name
    this.mongoURI = mongoURI + '/' + dbName;
    // Initialize the connection options as an empty object
    this.options = {};
  }

  // Public static method to get the singleton instance of the MongoClient
  public static getInstance(): MongoClient {
    // If the instance is not yet created, create a new instance
    if (!MongoClient.instance) {
      MongoClient.instance = new MongoClient();
    }
    // Return the existing instance
    return MongoClient.instance;
  }

  // Public method to connect to the MongoDB database
  public connect(): void {
    // Use Mongoose to connect to the MongoDB database using the constructed URI and options
    mongoose.connect(this.mongoURI, this.options)
      // If the connection is successful, log a success message with the URI
      .then(() => {
        logger.info('mongo-connection-success', { mongoURI: this.mongoURI });
      })
      // If the connection fails, log an error message with the URI, error message, and stack trace
      .catch((error) => {
        logger.error('mongo-connection-success', {
          mongoURI: this.mongoURI,
          msg: error.message,
          stack: error.stack
        });
      });
  }
}

export default MongoClient.getInstance();
