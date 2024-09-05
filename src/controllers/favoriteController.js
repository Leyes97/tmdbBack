const { User, FavoriteMovies } = require('../models/index');

// Agregar una película favorita
exports.addFavoriteMovie = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    // Buscar o crear un registro de FavoriteMovie para el usuario
    let favoriteMovies = await FavoriteMovies.findOne({ where: { userId } });

    if (!favoriteMovies) {
      favoriteMovies = await FavoriteMovies.create({
        userId,
        movieIds: [Number(movieId)],
      });
      return res.status(200).json(favoriteMovies);
    }

    // Verificar si la película ya está en favoritos

    if (favoriteMovies.movieIds.includes(Number(movieId))) {
      console.log('Película ya en favoritos:', movieId);
      return res
        .status(400)
        .json({ message: 'La película ya está en favoritos' });
    }

    // Agregar el movieId al arreglo
    const updateMoviesId = [...favoriteMovies.movieIds, Number(movieId)];

    await favoriteMovies.update({ movieIds: updateMoviesId });

    res.status(200).json(favoriteMovies);
  } catch (error) {
    console.error('Error al agregar la película favorita:', error);
    res
      .status(500)
      .json({ message: 'Error al agregar la película favorita', error });
  }
};

// Obtener todas las películas favoritas de un usuario
exports.getFavoriteMovies = async (req, res) => {
  const { id } = req.params;

  try {
    const favoriteMovies = await FavoriteMovies.findOrCreate({
      where: { userId: id },
      defaults: { userId: id },
      returning: true,
    });

    if (!favoriteMovies) {
      return res
        .status(404)
        .json({ message: 'No se encontraron películas favoritas' });
    }
    res.status(200).json(favoriteMovies[0].dataValues.movieIds);
  } catch (error) {
    console.error('Error al obtener las películas favoritas:', error);
    res
      .status(500)
      .json({ message: 'Error al obtener las películas favoritas', error });
  }
};

// Eliminar una película favorita
exports.removeFavoriteMovie = async (req, res) => {
  const { userId, movieId } = req.params;

  try {
    const favoriteMovies = await FavoriteMovies.findOne({ where: { userId } });

    if (!favoriteMovies || !favoriteMovies.movieIds.includes(Number(movieId))) {
      return res
        .status(404)
        .json({ message: 'Película favorita no encontrada' });
    }

    // Remover el movieId del arreglo
    const deleteMovies = favoriteMovies.movieIds.filter(
      (id) => id !== Number(movieId),
    );

    await favoriteMovies.update({ movieIds: deleteMovies });

    return res.status(200).json(favoriteMovies.movieIds);
  } catch (error) {
    console.error('Error al eliminar la película favorita:', error);
    res
      .status(500)
      .json({ message: 'Error al eliminar la película favorita', error });
  }
};
