const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodebyacademind', 'root', 'd4t4b4s3', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;