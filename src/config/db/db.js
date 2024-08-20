const Sequelize = require("sequelize");

const db = new Sequelize("tmdbLeyes","postgres", "Plataforma5@", {
    host: "localhost",
    dialect: "postgres",
    logging: false
});


module.exports = db