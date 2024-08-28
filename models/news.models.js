const db = require("../db/connection");

exports.selectTopics = () => {
  const queryStr = `SELECT * FROM topics;`;

  return db.query(queryStr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows;
  });
};

exports.articleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "Article not found" });
      return rows[0];
    });
};

exports.selectedArticles = () => {
  return db.query(
    `
  SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id)::INT AS comment_count 
  FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC
  `
  )
  .then(({rows}) => {
    return rows
  })
};


