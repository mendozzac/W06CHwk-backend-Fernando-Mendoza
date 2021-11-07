const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { idRobot } = req.params;
  console.log(idRobot);
  try {
    const searchedRobot = await Robot.findById(idRobot);
    if (searchedRobot) {
      res.json(searchedRobot);
    } else {
      const error = new Error("El robot no se encuentra");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getRobots, getRobotById };
