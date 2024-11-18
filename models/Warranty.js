const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Warranty extends Model {}

Warranty.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Warranty',
    tableName: 'warranties',
    timestamps: false,
});

module.exports = Warranty;
