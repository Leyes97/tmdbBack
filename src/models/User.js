const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db/db');
const bcrypt = require('bcrypt');

class User extends Model {
  //generamos un hash apartir del password y el salt
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password,
    );
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
  },
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(); //generamos el salt
  user.salt = salt; //le asignamos el salt a la instancia de User

  return user.hash(user.password, salt).then((hash) => {
    //esperamos a que se genere el password hasheado para despues crear el usuario
    user.password = hash;
  });
});

module.exports = User;
