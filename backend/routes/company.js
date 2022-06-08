const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');
const CustomError = require('../lib/custom-error');
const errorResponse = require('../lib/error-response');
const checkAuth = require('../middlewares/auth-middleware');

module.exports = (app, companyController) => {
  const companyRouter = new Router();
  app.use('/companies', companyRouter);

  // GET /api/v1/companies/:ownerUUID
  companyRouter.get('/:ownerUUID', [ checkAuth ], async (req, res, next) => {
    try {
      const { ownerUUID } = req.params;
      const companies = await companyController.getUsersCompany(ownerUUID);

      if (!companies) {
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
            companies,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });

  // POST /api/v1/companies/:ownerUUID
  companyRouter.post('/:ownerUUID',  [
    checkAuth,
    body('name').trim().escape(),
    body('registrationNumber').trim().escape(),
    body('description').trim().escape(),
    body('webSource').trim().isURL(),
    body('logoLink').trim().isURL(),
    body('needTranslate').isBoolean()
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, `Invalid registration data`);
      }

      const { name, registrationNumber, description, webSource, logoLink, needTranslate, country, region, companyType, companyCategory, businessType, registrationNumberType } = req.body;
      const { ownerUUID } = req.params;

      const newCompany = await companyController.createCompany({
        name,
        registrationNumber,
        description,
        webSource,
        logoLink,
        needTranslate,
        country,
        region,
        companyType,
        companyCategory,
        businessType,
        registrationNumberType,
        ownerUUID,
      });

      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: 'redirect',
           },
           client_data: {
             newCompany,
           }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
});
}
