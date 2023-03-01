const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/db');


class BusinessAccount extends Model { }

BusinessAccount.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
    },

    businessName: {
        type: DataTypes.STRING,
    },

}, {sequelize: db})

module.exports = BusinessAccount
