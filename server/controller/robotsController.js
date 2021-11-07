const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const searchedRobot = await Robot.findById(id);
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
