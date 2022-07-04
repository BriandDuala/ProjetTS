const request = require('supertest');
const app = require('../app');


describe("POST /users", () => {
  describe("given a username and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.statusCode).toBe(200)
    })

    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    test("password too short status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "pass"
      })
      expect(response.statusCode).toBe(201)
    })

    test("response json is 'good password' with status 200", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "Test2@345"
      })
      expect(response.body.message).toEqual("Everything is good")
    })

    test("response json is 'Medium password' with status 200", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "Test2345"
      })
      expect(response.body.message).toEqual("Medium password")
    })

    test("response json is 'Poor password' with status 200", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.body.message).toEqual("Poor password")
    })

  })

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})