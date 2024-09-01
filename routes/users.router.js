const express = require('express');
const { getUsers } = require('../controllers/news.controllers');

const usersRouter = express.Router();

usersRouter.route('/')
  .get(getUsers);

module.exports = usersRouter;