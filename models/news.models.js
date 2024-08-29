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
  const { rows } = await db.query(
    "SELECT * FROM articles WHERE article_id = $1",
    [article_id]
  );
  if (rows.length === 0)
    return Promise.reject({ status: 404, msg: "Article not found" });
  return rows[0];
};

exports.selectedArticles = async () => {
  const { rows } = await db.query(
    `
  SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id)::INT AS comment_count 
  FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC
  `
  );
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

exports.insertComment = (article_id, username, body) => {
  return db
    .query("SELECT author FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      const articleAuthor = rows[0].author;

      return db.query(
        "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *",
        [article_id, articleAuthor, body]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};
