// src/models/Status.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Status extends Model {}

Status.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Status',
    tableName: 'statuses',  // Ensure this matches your database table name
    timestamps: false,
});

module.exports = Status;
