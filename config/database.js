const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 60000, // Maximum time (in ms) to wait for a connection
      idle: 10000, // Maximum time (in ms) that a connection can be idle before being released
    },
  }
);

module.exports = sequelize;
