/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '192.168.3.90',
  user: 'nadine2',
  password: '54321',
  database: 'inidatabase',
});

// Define a function to create the 'Company' table if it doesn't exist
async function createCompanyTable() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Company (
        id INT AUTO_INCREMENT PRIMARY KEY,
        companyName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL
      )
    `);
    console.log('Company table created (if it did not exist)');
  } catch (error) {
    console.error('Error creating Company table:', error);
  } finally {
    connection.release();
  }
}

// Function to insert a new company
async function createCompany(company) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO Company (companyName, email, address) VALUES (?, ?, ?)',
      [company.companyName, company.email, company.address],
    );
    console.log('Company inserted successfully with ID:', result.insertId);
  } catch (error) {
    console.error('Error inserting Company:', error);
  } finally {
    connection.release();
  }
}

module.exports = { createCompanyTable, createCompany };
