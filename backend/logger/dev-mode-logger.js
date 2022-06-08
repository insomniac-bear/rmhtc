const { createLogger, format, transports } = require('winston');

const devModeLogger = () => {
  return createLogger({
    level: 'silly',
    format: format.json(),
    transports: [
      new transports.File({ filename: 'debug.log', level: 'silly'}),
    ]
  })
};

module.exports = devModeLogger;