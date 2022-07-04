const request = require('supertest');
const app = require('../app');
const assert = require('assert');


describe("POST /users", () => {
  describe("given a username and password", () => {

    it("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      assert.equal(response.statusCode, 200)
    })

    it("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      assert.equal(response.headers['content-type'], "json")
    })

    it("password too short status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "pass"
      })
      assert.equal(response.body.message, "Password too short expect to be >= 8 char")
    })

    it("response json is 'good password' with status 200", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "Test@2345"
      })
      assert.equal(response.body.message, "Everything is good")
    })

    it("response json is 'Medium password' with status 200", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "Test2345"
      })
      assert.equal(response.body.message, "Medium password")
    })

    it("response json is 'Poor password' with status 200", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      assert.equal(response.body.message, "Poor password")
    })

  })

  describe("when the username and password is missing", () => {
    it("should respond with a status code of 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        assert.equal(response.statusCode, 400)
      }
    })
  })

})