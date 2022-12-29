const request = require("supertest");
const app = require("../app");

describe("biodata.get function", () => {
  test("it should response the GET method", (done) => {
    request(app)
      .get("/biodata")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("jsonapi");
        expect(response.body).toHaveProperty("meta");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
        expect(response.body.jsonapi).toHaveProperty("version");
        expect(response.body.meta).toHaveProperty("author");
        expect(response.body.meta).toHaveProperty("copyright");
        expect(response.body.jsonapi.version).toBe("1.0");
        expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
        expect(response.body.meta.copyright).toBe(
          "2022 ~ BE JavaScript Binar Academy"
        );
        expect(response.body.status).toBe(200);
        expect(response.body.message).toBe("Data berhasil ditampilkan");
        done();
      });
  });
});
describe("biodata.create function", () => {
  test("it should response the POST method", (done) => {
    request(app)
      .post("/biodata")
      .send({ name: "Umar", age: 22, address: "Jakarta" })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("jsonapi");
        expect(response.body).toHaveProperty("meta");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
        expect(response.body.jsonapi).toHaveProperty("version");
        expect(response.body.meta).toHaveProperty("author");
        expect(response.body.meta).toHaveProperty("copyright");
        expect(response.body.jsonapi.version).toBe("1.0");
        expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
        expect(response.body.meta.copyright).toBe(
          "2022 ~ BE JavaScript Binar Academy"
        );
        expect(response.body.status).toBe(201);
        expect(response.body.message).toBe("Data berhasil ditambahkan");
        done();
      });
  });
});
describe("biodata.update function", () => {
  test("it should response the PUT method", (done) => {
    request(app)
      .put("/biodata/1")
      .send({ name: "Umar", age: 22, address: "Jakarta" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("jsonapi");
        expect(response.body).toHaveProperty("meta");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
        expect(response.body.jsonapi).toHaveProperty("version");
        expect(response.body.meta).toHaveProperty("author");
        expect(response.body.meta).toHaveProperty("copyright");
        expect(response.body.jsonapi.version).toBe("1.0");
        expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
        expect(response.body.meta.copyright).toBe(
          "2022 ~ BE JavaScript Binar Academy"
        );
        expect(response.body.status).toBe(200);
        expect(response.body.message).toBe("Data berhasil diubah");
        done();
      });
  });
});
describe("biodata.delete function", () => {
  test("it should response the DELETE method", (done) => {
    request(app)
      .delete("/biodata/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("jsonapi");
        expect(response.body).toHaveProperty("meta");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
        expect(response.body.jsonapi).toHaveProperty("version");
        expect(response.body.meta).toHaveProperty("author");
        expect(response.body.meta).toHaveProperty("copyright");
        expect(response.body.jsonapi.version).toBe("1.0");
        expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
        expect(response.body.meta.copyright).toBe(
          "2022 ~ BE JavaScript Binar Academy"
        );
        expect(response.body.status).toBe(200);
        expect(response.body.message).toBe("Data berhasil dihapus");
        done();
      });
  });
});