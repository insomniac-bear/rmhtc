const { createLogger, format, transports } = require('winston');

const devModeLogger = () => {
  return createLogger({
    level: 'http',
    format: format.json(),
    transports: [
      new transports.File({ filename: 'logs.log', level: 'http'}),
    ]
  })
};

module.exports = devModeLogger;