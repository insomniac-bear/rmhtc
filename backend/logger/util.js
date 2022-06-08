const { format } = require('winston');

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} : [${level}] : ${message}`;
});

module.exports = {myFormat}