const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AssetType extends Model {}

AssetType.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'AssetType',
    tableName: 'asset_types',
    timestamps: false,
});

module.exports = AssetType;
