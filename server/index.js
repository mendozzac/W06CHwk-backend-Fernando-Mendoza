const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const robotsRoutes = require("./routes/robotsRoutes");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`A ver si habla el puero ${port}.`));
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
app.use("/robots", robotsRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
