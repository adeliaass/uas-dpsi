const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule: require('mysql2'), // Use mysql2
  logging: console.log,
  dialectOptions: {
    // Leave this object empty or do not include it if not using SSL
  }
});

module.exports = sequelize;
