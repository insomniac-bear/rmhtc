const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
const { Companies } = require('../models');
const { Op } = require('sequelize');

/**
 * Функция получения всех компаний из БД
 * @returns {Array of Object} companies
 */
async function getAllCompanies() {
  const companies = await Companies.findAll();
  if (!companies.length) {
    throw new CustomError('failed', StatusCodes.NOT_FOUND, 'Companies not found');
  }

  return companies;
};

/**
 * Функция поиска компании в БД по uuid
 * @param {String} uuid of company
 * @returns {Object} company
 */
async function getCompanyById (uuid) {
  const company = await Companies.findByPk(uuid);
  if (!company) {
    throw new CustomError('failed', StatusCodes.NOT_FOUND, 'Company not found');
  }

  return company;
};

/**
 * Функция поиска компании в БД по параметру
 * @param {String} param - search param
 * @param {String} value - value of param
 * @returns {Object} company
 */
async function getCompanyByParam (param, value) {
  const company = await Companies.findOne({
    where: {
      [param]: value,
    }
  });
  if (!company) {
    return undefined;
  }

  return company;
};

/**
 * Функция создания компании
 * @param {Object} company data
 * @returns {Object} new company
 */
async function createCompany (company) {
  const newCompany = Companies.build(company);
  await newCompany.save();
  return newCompany;
};

/**
 * Функция возвращения количества отмодерированных компаний пользователя
 * @param {String} userUuid
 * @returns Count of moderated companies
 */
async function getUsersModeratedCompanyCount (userUuid) {
  const companyCount = await Companies.count({
    where: {
      [Op.and]: {
        userUuid,
        moderated: true,
      }
    }
  });
  return companyCount;
};

/**
 * Функция получения количества всех компаний пользователя
 * @param {String} userUuid
 * @returns Count of all user's companies
 */
async function getUsersAllCompanyCount (userUuid) {
  const companyCount = await Companies.count({
    where: {
      userUuid,
    }
  });
  return companyCount
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  getCompanyByParam,
  createCompany,
  getUsersAllCompanyCount,
  getUsersModeratedCompanyCount,
}
