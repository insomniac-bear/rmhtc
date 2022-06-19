const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
const { getUserByParam, createUser } = require('../users/users.service');
const {
  generateEmailVerificationToken,
  saveEmailVerificationToken,
} = require('../tokens/tokens.service');
const { CLIENT_URL } = require('../const');
const transporter = require('../lib/mailer');

async function registrationUser (email) {
  const candidate = await getUserByParam('email', email);
  if (candidate) {
    throw new CustomError('failed', StatusCodes.BAD_REQUEST, `${email} already in use`);
  }

  const { uuid } = await createUser({ email });

  const emailToken = generateEmailVerificationToken({ uuid, email });
  const accessLink = `${CLIENT_URL}/${emailToken}`;
  const savedToken = await saveEmailVerificationToken(emailToken, uuid);
  if (!savedToken) {
    throw new CustomError('error', StatusCodes.INTERNAL_SERVER_ERROR, 'Some problem in auth.controller.js on 30rd line');
  }
  await transporter.sendMail({
    from: 'RMHTC <info@rmhtc.ru>',
    to: `${email}, ${email}`,
    subject: 'Registration on RMHTC Web Platform',
    text: `Your access link for aprove email is ${accessLink}`
  });

  return true;
}

module.exports = {
  registrationUser
};
