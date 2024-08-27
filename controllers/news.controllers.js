const { selectTopics, selectApis } = require('../models/news.models');

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getApi = (req, res, next) => {
    selectApis()
    .then((api) => {
        res.status(200).send({ api });
    })
    .catch((err) => {
        next(err)
    })
};