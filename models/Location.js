// models/Location.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Location extends Model {}

Location.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Location',
    tableName: 'locations',
    timestamps: false,
});

module.exports = Location;
