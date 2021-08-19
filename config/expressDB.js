const { Sequelize } = require('sequelize');

module.exports = new Sequelize('codegig', 'torry', 'tl', {
  host: 'localhost',
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});