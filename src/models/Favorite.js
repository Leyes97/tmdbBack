
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db/db');
const User = require('./User');

class FavoriteMovie extends Model {}

FavoriteMovie.init(
  {
    movieIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), 
      allowNull: false,
      defaultValue: [], 
    },
  },
  {
    sequelize,
    modelName: 'favoriteMovie',
  }
);


FavoriteMovie.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(FavoriteMovie, { foreignKey: 'userId' });

module.exports = FavoriteMovie;
