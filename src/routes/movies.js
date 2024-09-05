const express = require('express');
const router = express.Router();

//controllers
const {
  allGenres,
  cinemaMovies,
  popularMovies,
  topMovies,
  upcomingMovies,
  searchMovie,
  getMovieById,
} = require('../controllers/moviesController');

router.get('/genres', allGenres); // trae todos los generos de peliculas disponibles;
router.get('/cinema', cinemaMovies); // trae todas las peliculas actualmente en el cine;
router.get('/popular', popularMovies); // trae todas las peliculas populares
router.get('/top', topMovies); // trae todas las peliculas mejor valoradas
router.get('/upcoming', upcomingMovies); // trae todas las proximas peliculas a estrenar
router.post('/search', searchMovie); //busca peliculas por nombre
router.get('/:id', getMovieById); // busca peliculas por id
module.exports = router;
