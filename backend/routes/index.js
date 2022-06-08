const { Router } = require('express');

const user = require('./user');
const service = require('./service');
const company = require('./company');

const userController = require('../controllers/user-controllers');
const serviceController = require('../controllers/service-controller');
const companyController = require('../controllers/company-controller');

const app = new Router();

(() => {
  user(app, new userController());
  service(app, new serviceController());
  company(app, new companyController());
})();

module.exports = app;