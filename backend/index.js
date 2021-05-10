const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const logger = require("morgan");
const { loadModules, loadRoutes } = require('./src/utils/index');

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => {
  //Express Modules
  loadModules();
  // Express Routes
  loadRoutes(app);

  app.get('/', (req, res) => {
      res.send('Warehouse Managament API..');
  });
});

const port = process.env.PORT;
app.listen(port);

module.exports = app;
