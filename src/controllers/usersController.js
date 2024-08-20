
//cambiar a admin
exports.admin = (req, res) => {
  const { id } = req.params;

  User.findByPk(id).then((user) => {
    user.update({ admin: true });
    res.sendStatus(204);
  });
};

// editar users
exports.profile = (req, res) => {
  const userId = req.user.id;

  User.update(req.body, {
    where: { id: userId },
    returning: true,
  }).then(() => res.sendStatus(204));
};

// cambiar contraseÃ±a
exports.changePassword = (req, res) => {
  const userId = req.user.id;

  User.update(req.body, {
    where: { id: userId },
    returning: true,
    individualHooks: true,
  }).then(() => res.sendStatus(204));
};

// traer todos los usuarios
exports.users = (req, res) => {
  User.findAll().then((users) => res.send(users));
};

// traer un usuario
exports.user = (req, res) => {
  const { id } = req.params;
  User.findOne({
    where: { id: id },
  }).then((user) => res.send(user));
};

//delete un usuario
exports.deleteUser = (req, res) => {
  if (req.user.admin) {
    const { id } = req.params;
    User.destroy({ where: { id } }).then(() => res.sendStatus(200));
  }
};

// dar admin a otro -no
exports.darNewAdmin = (req, res) => {
  const { id } = req.params;

  if (req.user.admin && req.user.id !== id) {
    User.findByPk(id).then((usuario) => {
      if (usuario.admin) {
        usuario
          .update({ admin: false })
          .then(() => {
            res.sendStatus(201);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        usuario
          .update({ admin: true })
          .then(() => {
            res.sendStatus(201);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
};