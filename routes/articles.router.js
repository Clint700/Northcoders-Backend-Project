const express = require('express');
const { getArticles, getArticleById, patchArticleById, getArticleComments, postComment } = require('../controllers/news.controllers');

const articlesRouter = express.Router();

articlesRouter.route('/')
  .get(getArticles);

articlesRouter.route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter.route('/:article_id/comments')
  .get(getArticleComments)
  .post(postComment);

module.exports = articlesRouter;