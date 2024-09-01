const express = require('express');
const { deleteComment } = require('../controllers/news.controllers');

const commentsRouter = express.Router();

commentsRouter.route('/:comment_id')
  .delete(deleteComment);

module.exports = commentsRouter;