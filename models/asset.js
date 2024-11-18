// models/Asset.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Asset extends Model {}

Asset.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  warrantyStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignedUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Asset',
  tableName: 'Assets', // Matches your table name in the database
  timestamps: true,
});

module.exports = Asset;
