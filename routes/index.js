const express = require('express');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
const usersRouter = require('./users.router');
const topicsRouter = require('./topics.router');

const apiRouter = express.Router();

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;