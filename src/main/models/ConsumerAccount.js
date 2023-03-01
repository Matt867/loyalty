const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/db');


class ConsumerAccount extends Model { }

ConsumerAccount.init({
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

}, {sequelize: db})

module.exports = ConsumerAccount
