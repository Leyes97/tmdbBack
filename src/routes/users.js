const express = require('express');
const router = express.Router();

const { validateAuth } = require('../middleware/auth');

const {
  register,
  login,
  validation,
  logout,
} = require('../controllers/authController');
const {
  profile,
  changePassword,
  users,
  user,
  admin,
  darNewAdmin,
  deleteUser,
} = require('../controllers/usersController');

const {
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
} = require('../controllers/favoriteController');

router.put('/admin/:id', validateAuth, admin);

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/me', validateAuth, validation);

router.put('/profile/', validateAuth, profile);

router.put('/changePassword', validateAuth, changePassword);

router.get('/', validateAuth, users);

router.get('/user/:id', validateAuth, user);

router.put('/darNewAdmin/:id', validateAuth, darNewAdmin);

router.delete('/deleteUser/:id', validateAuth, deleteUser);

// Rutas para manejar las películas favoritas
router.post('/add/:userId/:movieId', addFavoriteMovie);
router.get('/get/:id', getFavoriteMovies);
router.delete('/remove/:userId/:movieId', removeFavoriteMovie);

module.exports = router;
