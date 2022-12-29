const request = require("supertest");
const app = require("../app");

describe.skip("auth.register function", () => {
  it("it should response the register method", done => {
    request(app).post("/register").send({name: "Khana Zulfana Imam", password: "281002"}).then(response => {	
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("jsonapi");
      expect(response.body).toHaveProperty("meta");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.jsonapi).toHaveProperty("version");
      expect(response.body.meta).toHaveProperty("author");
      expect(response.body.meta).toHaveProperty("copyright");
      expect(response.body.data).toHaveProperty("username");
      expect(response.body.jsonapi.version).toBe("1.0");
      expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
      expect(response.body.meta.copyright).toBe("2022 ~ BE JavaScript Binar Academy");
      expect(response.body.status).toBe(201);
      expect(response.body.message).toBe("Data berhasil ditambahkan");
      expect(response.body.data.username).toBe("Khana Zulfana Imam");
      done();
    });
  });
});
describe.skip("auth.login function", () => {
  it("it should response the login method", done => {
    request(app).post("/login").send({name: "Khana Zulfana Imam", password: "281002"}).then(response => {	
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("jsonapi");
      expect(response.body).toHaveProperty("meta");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.jsonapi).toHaveProperty("version");
      expect(response.body.meta).toHaveProperty("author");
      expect(response.body.meta).toHaveProperty("copyright");
      expect(response.body.data).toHaveProperty("username");
      expect(response.body.jsonapi.version).toBe("1.0");
      expect(response.body.meta.author).toBe("Muhammad Umar Mansyur");
      expect(response.body.meta.copyright).toBe("2022 ~ BE JavaScript Binar Academy");
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe("Login berhasil");
      expect(response.body.data.username).toBe("Khana Zulfana Imam");
      done();
    });
  });
});