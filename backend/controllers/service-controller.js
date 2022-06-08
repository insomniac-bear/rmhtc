const { StatusCodes } = require('http-status-codes');
const models = require('../models');
const CustomError = require('../lib/custom-error');

class ServiceController {
  #Country
  #Region
  #CompanyType
  #CompanyCategory
  #BusinessType
  #RegistrationNumberType

  constructor() {
    this.#Country = models.Country;
    this.#Region = models.Region;
    this.#RegistrationNumberType = models.RegistrationNumberType;
    this.#CompanyType = models.CompanyType;
    this.#CompanyCategory = models.CompanyCategory;
    this.#BusinessType = models.BusinessType;
  }

  async getCountries() {
    const countries = await this.#Country.findAll();
    if (countries.length === 0) {
      return undefined;
    }
    return countries;
  }

  async getRegions(countryUUID) {
    const regions = await this.#Region.findAll({
      where: {
        CountryUUID: countryUUID,
      },
        raw: true,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'CountryUUID']
        }
    });

    if (regions.length === 0) {
      return undefined;
    }

    return regions;
  }

  async getRegistrationNumberTypes(countryUUID) {
    const registrationNumerTypes = await this.#RegistrationNumberType.findAll({
      where: {
        CountryUUID: countryUUID,
      },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'CountryUUID']
      }
  });

    if (registrationNumerTypes.length === 0) {
      return undefined;
    }

    return registrationNumerTypes;
  }

  async getCompanyTypes(countryUUID) {
    const companyTypes = await this.#CompanyType.findAll({
      where: {
        CountryUUID: countryUUID,
      },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'CountryUUID']
      }
  });

    if (companyTypes.length === 0) {
      return undefined;
    }

    return companyTypes;
  }

  async getCompanyCategories(countryUUID) {
    const companyCategories = await this.#CompanyCategory.findAll({
      where: {
        CountryUUID: countryUUID,
      },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'CountryUUID']
      }
  });

    if (companyCategories.length === 0) {
      return undefined;
    }

    return companyCategories;
  }

  async getBusinessTypes(countryUUID) {
    const businessTypes = await this.#BusinessType.findAll({
      where: {
        CountryUUID: countryUUID,
      },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'CountryUUID']
      }
  });

    if (businessTypes.length === 0) {
      return undefined;
    }

    return businessTypes;
  }
}

module.exports = ServiceController;
