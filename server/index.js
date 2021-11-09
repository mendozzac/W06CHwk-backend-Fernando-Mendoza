const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("./middlewares/auth");
const robotsRoutes = require("./routes/robotsRoutes");
const userRoute = require("./routes/usersRoute");
const {
  notFoundErrorHandler,
  generalErrorHandler,
} = require("./middlewares/error");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando el palique del puero ${port}.`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Al iniciar, peta."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} se está usando.`));
    }
  });
};

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/robots", auth, robotsRoutes);
app.use("/users", userRoute);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
