/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const mysql = require('mysql2');
const express = require('express');
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');

const app = express();
const port = 3000;

const run = async () => {
  const connection = mysql.createConnection({
    host: '192.168.3.90',
    user: 'nadine2',
    password: '54321',
    database: 'inidatabase',
  });
  await connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);
  app.use(admin.options.rootPath, router);
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
};

module.exports = run;
