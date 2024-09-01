const {
  selectedTopics,
  articleById,
  selectedArticles,
  selectedArticlesComments,
  selectedUsers,
  insertComment,
  insertVote,
  deletedComment,
  selectedUser,
  updateComment,
} = require("../models/news.models");
const endpoints = require("../endpoints.json");

exports.getTopics = (_req, res, next) => {
  selectedTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEndpoints = (_req, res) => {
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
  const { sort_by, order, topic } = req.query;
  if (!isNaN(topic)) {
    return res.status(404).send({ msg: "Invalid topic" });
  }
  selectedArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  articleById(article_id)
    .then(() => {
      return selectedArticlesComments(article_id);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Article ID Must Be A Number" });
  } else if (!username || !body) {
    return res.status(400).send({ msg: "Bad request" });
  } else {
    insertComment(article_id, username, body)
      .then((comment) => {
        res.status(201).send({ comment });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { votes } = req.body;

  if (typeof votes !== "number" && !votes) {
    return res.status(400).send({ msg: "Bad Request" });
  }

  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Article ID must be a number" });
  }
  insertVote(article_id, votes)
    .then((vote) => {
      res.status(200).send({ vote });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  if (isNaN(comment_id)) {
    return res.status(400).send({ msg: "Comment_id must be a number" });
  }
  deletedComment(comment_id)
    .then(() => {
      res.status(204).send({ msg: "no content" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (_req, res, _next) => {
  selectedUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUsersByID = (req, res, next) => {
  const { username } = req.params;
  selectedUser(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { votes } = req.body;

  if (!votes) {
    return res.status(400).send({ msg: "No vote" });
  }

  if (isNaN(comment_id)) {
    return res.status(400).send({ msg: "Comment_id must be a number" });
  }
  updateComment(comment_id, votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
