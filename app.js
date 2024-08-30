const express = require("express");
const app = express();
const {
  getTopics,
  getArticleById,
  getEndpoints,
  getArticles,
  getArticleComments,
  postComment,
  patchArticleById
} = require("./controllers/news.controllers");
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./error-handling");

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;

/*
CORE: PATCH /api/articles/:article_id
Description
Should:
be available on /api/articles/:article_id.
update an article by article_id.
Request body accepts:
an object in the form { inc_votes: newVote }.
newVote will indicate how much the votes property in the database should be updated by, e.g.
{ inc_votes : 1 } would increment the current article's vote property by 1
{ inc_votes : -100 } would decrement the current article's vote property by 100
Responds with:
the updated article
Consider what errors could occur with this endpoint, and make sure to test for them.
Remember to add a description of this endpoint to your /api endpoint.
*/