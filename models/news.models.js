const db = require("../db/connection");

exports.selectedTopics = async () => {
  const queryStr = `SELECT * FROM topics;`;

  const { rows } = await db.query(queryStr);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }
  return rows;
};

exports.articleById = async (article_id) => {
  const queryStr = `
    SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.article_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
  `;

  const { rows } = await db.query(queryStr, [article_id]);
  if (rows.length === 0)
    return Promise.reject({ status: 404, msg: "Article not found" });
  return rows[0];
};

exports.selectedArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic
) => {
  const validSort_by = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrders = ["asc", "desc"];
  let queryStr = `
    SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id)::INT AS comment_count 
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
  `;
  const queryValues = [];

  if (!validSort_by.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid query" });
  }

  if (!validOrders.includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, msg: "Invalid order" });
  }

  if (topic) {
    queryStr += `WHERE topic = $1 `;
    queryValues.push(topic);
  }

  queryStr += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order.toUpperCase()}
  `;

  const { rows } = await db.query(queryStr, queryValues);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Topic not found" });
  }
  return rows;
};

exports.selectedArticlesComments = async (article_id) => {
  const { rows } = await db.query(
    "SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC",
    [article_id]
  );
  if (rows.length === 0) {
    return [];
  }
  return rows;
};

exports.insertComment = async (article_id, username, body) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }

      return db.query("SELECT * FROM users WHERE username = $1", [username]);
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User does not exist" });
      }

      return db.query(
        "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *",
        [article_id, username, body]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.insertVote = async (article_id, votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid article ID" });
      }
      return rows[0];
    });
};

exports.deletedComment = async (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return rows[0];
    });
};

exports.selectedUsers = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};
