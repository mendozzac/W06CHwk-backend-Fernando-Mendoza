const Robot = require("../../database/models/robot");
const { getRobots, getRobotById } = require("./robotsController");

jest.mock("../../database/models/robot");

describe("Given a getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const robots = [
        {
          id: 1,
          name: "Fredy",
          image: "url, loquesea",
          features: { speed: 5, stamina: 8, date: 89 },
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given a getRobotById function", () => {
  describe("When it receives a request with an id 6, a res object and a next function", () => {
    test("Then it should invoke Robot.findById with a 6", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 6;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });
  describe("And Robot.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
  describe("And Robot.findById resolves to Fredy", () => {
    test("Then it should invoke res.json with Fredy", async () => {
      const id = 1;
      const fredy = {
        id,
        name: "Fredy",
        speed: 5,
      };
      Robot.findById = jest.fn().mockResolvedValue(fredy);
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getRobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(fredy);
    });
  });
});
