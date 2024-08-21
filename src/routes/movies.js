const express = require('express');
const router = express.Router();

//controllers
const {
  allGenres,
  cinemaMovies,
  popularMovies,
  topMovies,
  upcomingMovies,
} = require('../controllers/moviesController');

router.get('/genres', allGenres); // trae todos los generos de peliculas disponibles;
router.get('/cinema', cinemaMovies); // trae todas las eliculas actualmente en el cine;
router.get('/popular', popularMovies); // trae todas las peliculas populares
router.get('/top', topMovies); // trae todas las peliculas mejor valoradas
router.get('/upcoming', upcomingMovies); // trae todas las proximas peliculas a estrenar

module.exports = router;
