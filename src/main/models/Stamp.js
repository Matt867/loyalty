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
    },
    stamperID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stampeeID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    validated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {sequelize: db})

module.exports = Stamp