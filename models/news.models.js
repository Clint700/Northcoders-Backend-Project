const db = require("../db/connection");
const api = require("../endpoints.json");
const checkExists = require("../utils");

//reference note
// const selectPets = async ({ species }) => {
//   if (!pets.length) {
//     await checkExists("species", "species_name", species);
//   }
// };

exports.selectTopics = () => {
    const queryStr = `SELECT * FROM topics;`;

    return db.query(queryStr).then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return rows;
    });
};
exports.selectApis = () => {
  return new Promise((resolve, reject) => {
    if (api.length === 0) {
      reject({ status: 404, msg: "Not Found" });
    } else {
      resolve(api);
    }
  });
};