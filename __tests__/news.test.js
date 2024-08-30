const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpointData = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("/api/topics", () => {
  test("200 returns topics with correct keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { topics } = response.body;
        expect(Array.isArray(topics)).toBe(true);
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("Not Found", () => {
  test("404 returns Not Found", () => {
    return request(app)
      .get("/api/top")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
});

describe("/api", () => {
  test("/api retrives all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointData);
      });
  });
});

describe("GET /api/articles/:articles_id", () => {
  test("200: responds with an article object, which has appropriate properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(typeof article).toBe("object");
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: expect.any(String),
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          })
        );
      });
  });
  test("404: sends an appropriate status and error message when given a non-existant id", () => {
    return request(app)
      .get("/api/articles/111")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Article not found");
      });
  });
  test("400: sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/unknown")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("task-5-/api/articles", () => {
  test("200: responds with an array of all the articles with appropriate properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(Array.isArray(articles)).toBe(true);
        expect(articles).toBeSortedBy("created_at", { descending: true });
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
          expect(article).not.toHaveProperty("body");
        });
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET /api/articles/:article_id/comments", () => {
    test("200: get all comments for an article", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(Array.isArray(comments)).toBe(true);
          expect(comments).toBeSortedBy("created_at", { descending: true });
          expect(comments.length).toBe(11);
          comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.article_id).toBe("number");
          });
        });
    });
    test("200: responds with an empty array for an empty comment or array", () => {
      return request(app)
        .get("/api/articles/4/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toEqual([]);
        });
    });

    test("404: sends an appropriate status and error message when given a non-existant id", () => {
      return request(app)
        .get("/api/articles/1001/comments")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Article not found");
        });
    });

    test("400: sends an appropriate status and error message when given an invalid id", () => {
      return request(app)
        .get("/api/articles/not-a-number/comments")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
  });

  describe("POST /api/articles/:article_id/comments", () => {
    test("201: POST /api/articles/:article_id/comments - responds with the newly added comment", () => {
      const newComment = {
        username: "icellusedkars",
        body: "Excellent article",
      };
      return request(app)
        .post("/api/articles/3/comments")
        .send(newComment)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual(
            expect.objectContaining({
              body: "Excellent article",
              votes: 0,
              author: "icellusedkars",
              article_id: 3,
              created_at: expect.any(String),
            })
          );
        });
    });

    test("404: test for an invalid article_id e.g 404", () => {
      const newComment = {
        username: "icellusedkars",
        body: "Highly recommedable",
      };
      return request(app)
        .post("/api/articles/404/comments")
        .send(newComment)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Article not found");
        });
    });

    test("400: test for a missing field by the client e.g no username or comment body", () => {
      const newComment = {
        username: "clint700",
      };
      return request(app)
        .post("/api/articles/3/comments")
        .send(newComment)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });

    test("400: test for an invalid article_id e.g not-a-number", () => {
      const newComment = {
        username: "icellusedkars",
        body: "Highly recommedable",
      };
      return request(app)
        .post("/api/articles/not-a-number/comments")
        .send(newComment)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Article ID Must Be A Number");
        });
    });

    test("404: test for an invalid username e.g `noneUser`", () => {
      const newComment = {
        username: "noneUser",
        body: "Highly recommedable",
      };
      return request(app)
        .post("/api/articles/3/comments")
        .send(newComment)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User does not exist");
        });
    });

    test("201: POST /api/articles/:article_id/comments - responds with the newly added comment and ignores unnecessary properties", () => {
      const newComment = {
        username: "icellusedkars",
        body: "Excellent article",
        otherProperties: "otherValues",
      };
      return request(app)
        .post("/api/articles/3/comments")
        .send(newComment)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment.otherProperties).toBeUndefined();
          expect(comment).toEqual(
            expect.objectContaining({
              body: "Excellent article",
              votes: 0,
              author: "icellusedkars",
              article_id: 3,
              created_at: expect.any(String),
            })
          );
        });
    });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Update an article by article_id", () => {
    const newVote = {
      votes: 10,
    };

    return request(app)
      .patch("/api/articles/3")
      .send(newVote)
      .expect(200)
      .then(({ body: { vote } }) => {
        expect(vote).toEqual(
          expect.objectContaining({
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            votes: 10,
            body: "some gifs",
            created_at: expect.any(String),
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          })
        );
      });
  });

  test("200: Ignores other properties", () => {
    const newVote = {
      votes: 10,
      otherProperty: 200
    };

    return request(app)
      .patch("/api/articles/3")
      .send(newVote)
      .expect(200)
      .then(({ body: { vote } }) => {
        expect(vote.otherProperty).toBeUndefined()
        expect(vote).toEqual(
          expect.objectContaining({
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            votes: 10,
            body: "some gifs",
            created_at: expect.any(String),
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          })
        );
      });
  });

  test("400: missing votes", () => {
    const newVote = {};

    return request(app)
      .patch("/api/articles/3")
      .send(newVote)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });

  test("404: Invalid article_id e.g 404", () => {
    const newVote = {
      votes: 10,
    };

    return request(app)
      .patch("/api/articles/404")
      .send(newVote)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid article ID");
      });
  });

  test("400: article_id isn't a number e.g unknown", () => {
    const newVote = {
      votes: 10,
    };

    return request(app)
      .patch("/api/articles/unknown")
      .send(newVote)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Article ID must be a number");
      });
  });

  test("400: If vote isn't a number", () => {
    const newVote = {
      vote: "not a number"
    };

    return request(app)
      .patch("/api/articles/3")
      .send(newVote)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });
});
