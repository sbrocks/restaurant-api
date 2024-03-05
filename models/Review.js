const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Listing = require('./Listing');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
});

Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Listing, { foreignKey: 'listingId', as: 'listing' });

module.exports = Review;
