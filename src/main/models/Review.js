const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/db')

class Review extends Model {};

Review.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    reviewBody: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    businessID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: false
    },
    authorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {sequelize: db})

module.exports = Review