require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const Robot = require("../../database/models/robot");
const { initializeServer } = require("../index");
const connectDB = require("../../database/index");

const robot = {
  __v: 0,
  features: {
    speed: 8,
    stamina: 10,
    date: "2019",
  },
  _id: "61855f5b4f616ae40e5cc843",
  name: "Fredy",
  image: "url",
};

let token;
let server;

beforeAll(async () => {
  await connectDB(process.env.MONGODB_ROBOTS_TEST);
  await Robot.deleteMany({});
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

describe("Given a /robots/create route", () => {
  describe("When it receives a Post request with header", () => {
    test("Then it should respond with a robot", async () => {
      const { body } = await request
        .post("/robots/create")
        .send(robot)
        .set("Authorization", `Bearer ${token}`)

        .expect(200);
      expect(body).toHaveProperty("name", robot.name);
      expect(body).toHaveProperty("image", robot.image);
    });
  });
  describe("When it receives a Post request without header", () => {
    test("Then it should respond with an error", async () => {
      const { body } = await request
        .post("robots/create")
        .send(robot)
        .expect(400);

      expect(body).toHaveProperty("error");
    });
  });
});
