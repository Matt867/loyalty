const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/db')

class Stamp extends Model {};

Stamp.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {sequelize: db})

module.exports = Stamp