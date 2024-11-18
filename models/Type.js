// models/Type.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Type extends Model {}

Type.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Type',
    tableName: 'types',
    timestamps: false,
});

module.exports = Type;
