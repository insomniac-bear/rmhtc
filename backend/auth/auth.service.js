const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
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
  const accessLink = process.env.NODE_ENV === 'local'
    ? `${CLIENT_URL}/${emailToken}:3000`
    : `${CLIENT_URL}/${emailToken}`;
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

async function authUser (email, password) {
  const candidate = await getUserByParam('email', email);
  if (!candidate) {
    throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Invalid email or password');
  }

  const passwordIsMatch = bcrypt.compareSync(password, candidate.password);
  if (!passwordIsMatch) {
    throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Invalid email or password');
  }

  return candidate;
}

module.exports = {
  registrationUser,
  authUser
};
