const { selectTopics, articleById, selectedArticles, selectedArticlesComments } = require("../models/news.models");
const endpoints = require("../endpoints.json");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEndpoints = (req, res) => {
  res.status(200).send({ endpoints });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  articleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectedArticles().then((articles) => {
    res.status(200).send({ articles });
  })
  .catch((err) => {
    next(err)
  })
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params
  articleById(article_id).then(() => {
    return selectedArticlesComments(article_id)
  })
  .then((comments) => {
    res.status(200).send({ comments })
  })
  .catch((err) => {
    next(err)
  })
};