const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const logger = require('./logger');
const { ExitCode, PORT } = require('./const');
const sequilize = require('./db/sequilize');
const usersRoutes = require('./users/users.router');
const tokensRoutes = require('./tokens/tokens.router');
const authRoutes = require('./auth/auth.route');
const CustomError = require('./lib/custom-error');
const { API_PREFIX } = require('./const');

const app = express();

// const allowedDomains = [
//   'http://10.16.10.1:3002/',
//   'http://10.16.10.1:3002',
//   'http://10.16.10.1:3001/',
//   'http://10.16.10.1:3001',
//   'http://localhost:3000/',
//   'http://localhost:3000'
// ];

// app.use(cors({
//   origin: (origin, cb) => {
//     if (!allowedDomains.includes(origin)) {
//       const msg = 'Access denied, CORS';
//       return cb(new CustomError('error', 500, msg), false);
//     }
//     return cb(null, true);
//   },
//   methods: 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
//   credentials: true,
// }));

app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Status code is ${res.statusCode}`);
  });
  next();
});

app.use(`${API_PREFIX}/users`, usersRoutes);
app.use(`${API_PREFIX}/tokens`, tokensRoutes);
app.use(`${API_PREFIX}/`,authRoutes);

// Catch all server errors
app.use((err, _req, res, _next) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      message: `Server error: ${err}`,
      data: []
    });
  logger.error(`An error occured on processing request: ${err}`);
});

// Catch all unhandled rejection
process.on(`unhandledRejection`, (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Server function
async function server () {
  try {
    logger.info('Truing to connect to database...');
    await sequilize.authenticate();
    await sequilize.sync();
    app.listen(PORT, () => {
      logger.info(`API Server has been started on port ${ PORT }`);
    })
  } catch (err) {
    logger.log(`Server error: ${ err.message }`);
    process.exit(ExitCode.ERROR);
  }
};

server();
