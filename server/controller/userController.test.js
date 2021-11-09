const checkLogin = require("./userController");
const User = require("../../database/models/user");

jest.mock("../../database/models/user");

describe("Given a checkLogin function", () => {
  describe("When it receives a wrong user", () => {
    test("Then it should invoke next function with error rejected", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          name: "wayaba",
          password: "cualquiercosa",
        },
      };
      const next = jest.fn();

      await checkLogin(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
