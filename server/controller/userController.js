const chalk = require("chalk");
const debug = require("debug")("users:controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const checkLogin = async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  if (!user) {
    debug(chalk.red("Te equivocaste compañero"));
    const error = new Error("Se te fue la pinza");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      debug(chalk.red("Te equivocaste"));
      const error = new Error("Fallo guapo");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 24 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

module.exports = checkLogin;
