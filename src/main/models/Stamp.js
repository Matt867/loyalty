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
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stamperID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stampeeID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isBusinessStampee: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isBusinessStamper: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {sequelize: db})

module.exports = Stamp