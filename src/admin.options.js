/* eslint-disable import/no-extraneous-dependencies */
const AdminBro = require('admin-bro');
const { Company } = require('./companies/company.entity');

/** @type {AdminBro.AdminBroOptions} */
const options = {
  // For admin endpoints
  rootPath: '/dashboard',
  resources: [Company],

};
module.exports = options;
