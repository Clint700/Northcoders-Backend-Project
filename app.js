const express = require('express');
const apiRouter = require('./routes');
const { getEndpoints } = require('./controllers/news.controllers');
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./error-handling");

const app = express();

app.use(express.json());

app.get('/api', getEndpoints);

app.use('/api', apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;