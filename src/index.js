// Cargar las variables de entorno
require('dotenv').config();

// Configuración del server
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const models = require('./models');
const cors = require('cors');

const app = express();
const db = require('./config/db/db');

// Express Route File Requires

const routes = require('./routes');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Express Routing
app.use('/api', routes);

db.sync({ force: false }).then(() => {
  console.log('db connected');
  app.listen(8080, () => {
    console.log(`Server listening at port 8080`);
  });
});
