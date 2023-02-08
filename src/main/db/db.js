// imports
const { Sequelize } = require('sequelize');
const path = require('path');

//create an instance of the database call it db
const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, './data.sqlite'),
    logging: false
});

//export
module.exports = db