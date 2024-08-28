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
  return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
  .then(({ rows }) => {
      if (rows.length === 0) return Promise.reject({ status: 404, msg: "Article not found" });
      return rows[0];
  });
};
