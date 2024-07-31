const winston = require('winston');
const { format, transports } = winston;
const { combine, timestamp, printf } = format;

// Define el formato del log
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});


// Configuración de Winston para logging
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'app.log' })
    ],
  });

  module.exports = logger;
