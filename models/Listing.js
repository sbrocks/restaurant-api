const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Listing = sequelize.define('Listing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.STRING // Store image urls in PostgreSQL, images should be stored in AWS s3 or some cloud storage
  }
});

Listing.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = Listing;
