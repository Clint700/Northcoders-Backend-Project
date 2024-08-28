const express = require("express");
const { getTopics, getArticleById, getEndpoints, getArticles, getArticleComments } = require("./controllers/news.controllers");
const { notFoundError, psqlError, internalServerError } = require("./error-handling");

const app = express();

app.get("/api", getEndpoints)
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments)

app.all("*", notFoundError);
app.use(psqlError);
app.use(internalServerError);

module.exports = app;

/*
CORE: GET /api/articles/:article_id/comments
Description
Should:
be available on /api/articles/:article_id/comments.
get all comments for an article.
Responds with:
an array of comments for the given article_id of which each comment should have the following properties:
comment_id
votes
created_at
author
body
article_id
Comments should be served with the most recent comments first.
Consider what errors could occur with this endpoint, and make sure to test for them.
Remember to add a description of this endpoint to your /api endpoint.
*/