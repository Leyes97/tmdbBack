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

module.exports = router;
