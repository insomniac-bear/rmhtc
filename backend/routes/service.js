const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../lib/custom-error');
const errorResponse = require('../lib/error-response');
const checkAuth = require('../middlewares/auth-middleware');

module.exports = (app, serviceController) => {
  const serviceRouter = new Router();
  app.use('/service', serviceRouter);

  // GET /api/v1/service/countries
  serviceRouter.get('/countries', [checkAuth], async (req, res, next) => {
    try {
      const countries = await serviceController.getCountries();
      if (!countries) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            service_data: {
              status: 'success',
              message: 'Not found',
            },
            client_data: {},
          });
      }
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: '',
           },
           client_data: {
             countries,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });

  // GET /api/v1/service/registration-type/:countryUUID
  serviceRouter.get('/registration-types/:countryUUID', [checkAuth], async (req, res, next) => {
    try {
      const { countryUUID } = req.params;
      const registrationNumberTypes = await serviceController.getRegistrationNumberTypes(countryUUID);

      if (!registrationNumberTypes) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            service_data: {
              status: 'success',
              message: 'Not found',
            },
            client_data: {},
          });
      }
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: '',
           },
           client_data: {
            registrationNumberTypes,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });

  // GET /api/v1/service/regions/:countryUUID
  serviceRouter.get('/regions/:countryUUID', [checkAuth], async (req, res, next) => {
    try {
      const { countryUUID } = req.params;
      const regions = await serviceController.getRegions(countryUUID);

      if (!regions) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            service_data: {
              status: 'success',
              message: 'Not found',
            },
            client_data: {},
          });
      }
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: '',
           },
           client_data: {
            regions,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });

  // GET /api/v1/service/company-types/:countryUUID
  serviceRouter.get('/company-types/:countryUUID', [checkAuth], async (req, res, next) => {
    try {
      const { countryUUID } = req.params;
      const companyTypes = await serviceController.getCompanyTypes(countryUUID);

      if (!companyTypes) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            service_data: {
              status: 'success',
              message: 'Not found',
            },
            client_data: {},
          });
      }
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: '',
           },
           client_data: {
            companyTypes,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });

  // GET /api/v1/service/company-categories/:countryUUID
  serviceRouter.get('/company-categories/:countryUUID', [checkAuth], async (req, res, next) => {
    try {
      const { countryUUID } = req.params;
      const companyCategories = await serviceController.getCompanyCategories(countryUUID);

      if (!companyCategories) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            service_data: {
              status: 'success',
              message: 'Not found',
            },
            client_data: {},
          });
      }
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: '',
           },
           client_data: {
            companyCategories,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });

  // GET /api/v1/service/business-types/:countryUUID
  serviceRouter.get('/business-types/:countryUUID', [checkAuth], async (req, res, next) => {
    try {
      const { countryUUID } = req.params;
      const businessTypes = await serviceController.getBusinessTypes(countryUUID);

      if (!businessTypes) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            service_data: {
              status: 'success',
              message: 'Not found',
            },
            client_data: {},
          });
      }
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: '',
           },
           client_data: {
            businessTypes,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });
};