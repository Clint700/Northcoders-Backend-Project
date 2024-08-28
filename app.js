const express = require("express");
const { getTopics, getArticleById, getEndpoints } = require("./controllers/news.controllers");
const { notFoundError, psqlError, internalServerError } = require("./error-handling");

const app = express();

app.get("/api", getEndpoints)
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.all("*", notFoundError);
app.use(psqlError);
app.use(internalServerError);

module.exports = app;

