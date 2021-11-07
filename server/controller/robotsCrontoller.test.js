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
});
