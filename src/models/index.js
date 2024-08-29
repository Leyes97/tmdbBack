const User = require('../models/User');
const FavoriteMovies = require('../models/Favorite');

// Definir relaciones
User.hasOne(FavoriteMovies, { foreignKey: 'userId' });
FavoriteMovies.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, FavoriteMovies };
