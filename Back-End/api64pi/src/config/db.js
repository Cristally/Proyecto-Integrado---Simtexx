const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '../../.env' }); // Ayuda a encontrar el .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Desactiva los logs de SQL en la consola
  }
);

module.exports = sequelize;