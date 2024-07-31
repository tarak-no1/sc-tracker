import winston from 'winston'; // Import the winston library for logging
import config from '../../config'; // Import the configuration file for application settings

const serviceName = config.getString('server', 'app_name', 'sc-tracker');

// Construct the file paths for error and info logs based on the service name
const errorLogsFile = `./logs/${serviceName}-error.log`;
const infoLogsFile = `./logs/${serviceName}.log`;

const logger = winston.createLogger({
  level: 'info', // Set the default logging level to 'info'
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize()
  ), // Format log messages as JSON objects
  defaultMeta: { service: serviceName }, // Add the service name as a default meta field to all logs
  transports: [
    // Create a file transport for error logs
    new winston.transports.File({ filename: errorLogsFile, level: 'error' }),
    // Create a file transport for info logs
    new winston.transports.File({ filename: infoLogsFile, level: 'info' }),
  ],
});

// If the application is running in a non-production environment, add a console transport
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(), // Use a simple format for console logs
  }));
}

export default logger;
