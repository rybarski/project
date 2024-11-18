// models/index.js
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const Status = require('./Status');
const Location = require('./Location');
const Type = require('./Type');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize.DataTypes); // keep this if your user model uses this format
db.Asset = require('./asset'); // Asset is already initialized, so just require it directly
db.Status = Status;
db.Location = Location;
db.Type = Type;

module.exports = db;
