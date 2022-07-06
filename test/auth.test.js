const request = require('supertest');
const app = require('../app');
const assert = require('assert');


describe("POST /users", () => {
  describe("Ok", () => {

    it("Strong password", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "Test@123"
      })
      assert.equal(response.statusCode, 200)
    })

  })

  describe("Bad request", () => {

    it("Poor password", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        assert.equal(response.statusCode, 400)
      }
    })

    it("Medium password", async () => {
      const bodyData = [
        {username: "username"},
        {password: "Pa55word"}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        assert.equal(response.statusCode, 400)
      }
    })

    it("Password too short expect to be >= 8 char", async () => {
      const bodyData = [
        {username: "username"},
        {password: "pass"}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        assert.equal(response.statusCode, 400)
      }
    })

    it("Username or passwords is incorrect", async () => {
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

  describe("Not found", () => {

    it("404 error", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      assert.equal(response.statusCode, 404)
    })

  }
  )


})