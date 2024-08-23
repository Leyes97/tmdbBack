const { User } = require('../models');
const { generateToken } = require('../config/tokens');
const tokens = require('../config/tokens');

// register
exports.register = (req, res) => {
  const userData = req.body;
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) User.create(userData).then(() => res.sendStatus(201));
    else {
      res.send({ message: 'Usuario ya registrado' });
    }
  });
};

// login
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        admin: user.admin,
      };
      const token = generateToken(payload); //
      res.cookie('token', token, { httpOnly: true });
      res.send(payload); //
    });
  });
};

//valida si hay un usuario logueado, pedido de validar token
exports.validation = (req, res) => {
  console.log(req.user);
  res.send(req.user);
};

// logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(204);
};
