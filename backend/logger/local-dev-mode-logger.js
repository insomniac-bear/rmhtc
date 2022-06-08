const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;

const { myFormat } = require('./util');

const localDevModeLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      timestamp({ format: 'HH:mm:ss' }),
      myFormat,
    ),
    transports: [
      new transports.Console(),
    ]
  })
};

module.exports = localDevModeLogger;
