const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("ALL TEST", () => {
  describe("/api/topics", () => {
    test("Test 1 - 200 returns topics with correct keys", () => {
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
    })
  })
})
