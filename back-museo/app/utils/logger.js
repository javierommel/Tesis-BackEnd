const winston = require('winston');
const { format } = winston;
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
require('dotenv').config();

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
    // Log actual en un archivo fijo
    new winston.transports.File({ filename: process.env.DIR_LOGS }),
    
    // Archivos rotados con fecha
    new DailyRotateFile({
      filename: 'logs/back-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Comprime los archivos antiguos
      maxSize: '20m', // Tamaño máximo del archivo
      maxFiles: '14d', // Mantiene solo logs de los últimos 14 días
      auditFile: 'logs/.audit.json', // Archivo de auditoría para trackear la rotación
      frequency: '24h', // Rotación diaria
    })
  ],
});

module.exports = logger;
