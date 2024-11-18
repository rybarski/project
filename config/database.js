const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',  // or 'mysql' if you're using MySQL
  port: process.env.DB_PORT || 5432,
  logging: false,  // Set to true if you want to see SQL queries in the logs
});

module.exports = sequelize;
