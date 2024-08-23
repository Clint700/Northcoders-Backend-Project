const express = require("express");
const { getTopics, getApi } = require("./controllers/news.controllers");

const app = express();

app.get("/api", getApi)
app.get("/api/topics", getTopics);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
  next(err)
});

app.all("*", (req, res) => {
    res.status(400).send({ msg: "Bad Request" });
  });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({ msg: err.msg || "Internal Server Error" });
});

module.exports = app;

/*
CORE: GET /api/topics
Before you begin, don't forget to branch!

Description
Should:
be available on endpoint /api/topics.
get all topics.

Responds with:
an array of topic objects, each of which should have the following properties:
slug
description
As this is the first endpoint, you will need to set up your testing suite.
Consider what errors could occur with this endpoint. As this is your first endpoint you may wish to also consider any general errors that could occur when making any type of request to your api. The errors that you identify should be fully tested for.
Note: although you may consider handling a 500 error in your app, we would not expect you to explicitly test for this.

*/
