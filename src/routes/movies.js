const express = require('express');
const router = express.Router();

//controllers
const {
  allGenres,
  cinemaMovies,
  popularMovies,
} = require('../controllers/moviesController');

router.get('/genres', allGenres); // trae todos los generos de peliculas disponibles;
router.get('/cinema', cinemaMovies); // trae todas las eliculas actualmente en el cine;
router.get('/popular', popularMovies); // trae todas las peliculas populares

module.exports = router;
