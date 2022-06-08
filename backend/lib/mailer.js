const nodemailer = require('nodemailer');

const mailConfig = {
  host: "smtp.mail.ru",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // tls: {
  //   ciphers:'SSLv3',
  //   rejectUnauthorized: false,
  // },

  port: 465,
  secure: true,
};

module.exports = nodemailer.createTransport(mailConfig);