const { validateToken } = require('../config/tokens');

function validateAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    const { user } = validateToken(token);
    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
  } catch (error) {
    console.log('error en la validacion', error);
    res.sendStatus(500);
  }
}

module.exports = { validateAuth };
