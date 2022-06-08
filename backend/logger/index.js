const localDevModeLogger = require('./local-dev-mode-logger');
const devModeLogger = require('./dev-mode-logger');
const prodModeLogger = require('./prod-mode-logger');

let logger = null;

switch (process.env.NODE_ENV) {
  case 'local':
    logger = localDevModeLogger();
    break;
  case 'development':
    logger = devModeLogger();
    break;
  case 'production':
    logger = prodModeLogger();
    break;
  default:
    logger = localDevModeLogger();
    break;
};

module.exports = logger;