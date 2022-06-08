const models = require('../models');
const CustomError = require('../lib/custom-error');
const { StatusCodes } = require('http-status-codes');

class companyController {
  #BusinessType;
  #CompanyCategory;
  #CompanyType;
  #Company;
  #Country;
  #ModerateCompany;
  #Region;
  #RegistrationNumberType;
  #User;

  constructor() {
    this.#BusinessType = models.BusinessType;
    this.#CompanyCategory = models.CompanyCategory;
    this.#CompanyType = models.CompanyType;
    this.#Company = models.Company;
    this.#Country = models.Country;
    this.#ModerateCompany = models.ModeratedCompany;
    this.#Region = models.Region;
    this.#RegistrationNumberType = models.RegistrationNumberType;
    this.#User = models.User;
  }

  async getUsersCompany (ownerUUID) {
    const companies = await this.#Company.findAll({
      where: {
        UserUUID: ownerUUID,
      },
      include: [{ model: this.#RegistrationNumberType }, { model: this.#ModerateCompany }]
    });
    if (companies.length === 0) {
      return undefined;
    }

    return companies;
  }

  async createCompany (companyData) {
    const candidate = this.#Company.findOne({
      where: {
        registrationNumber: companyData.registrationNumber
      }
    });
    if (candidate.length === 0) {
      throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'Company already exist');
    }

    const country = await this.#Country.findOne({ where: { name: companyData.country }});
    const region = await this.#Region.findOne({ where: { name: companyData.region }});
    const companyType = await this.#CompanyType.findOne({ where: { name: companyData.companyType }});
    const companyCategory = await this.#CompanyCategory.findOne({ where: { name: companyData.companyCategory }});
    const businessType = await this.#BusinessType.findOne({ where: { name: companyData.businessType }});
    const registrationNumberType = await this.#RegistrationNumberType.findOne({ where: { name: companyData.registrationNumberType }});
    const owner = await this.#User.findOne({ where: { UUID: companyData.ownerUUID }});

    const { name, registrationNumber, description, webSource, logoLink, needTranslate } = companyData;

    const moderatedCompany = await this.#ModerateCompany.create();

    const newCompany = await this.#Company.create({
      name,
      registrationNumber,
      description,
      webSource,
      logoLink,
      needTranslate,
      CountryUUID: country.UUID,
      RegionUUID: region.UUID,
      CompanyTypeUUID: companyType.UUID,
      CompanyCategoryUUID: companyCategory.UUID,
      BusinesTypeUUID: businessType.UUID,
      RegistrationNumberTypeUUID: registrationNumberType.UUID,
      ModeratedCompanyUUID: moderatedCompany.UUID,
      UserUUID: owner.UUID,
    });

    return newCompany;
  }
}

module.exports = companyController;