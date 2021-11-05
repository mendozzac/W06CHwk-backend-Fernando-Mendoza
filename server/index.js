const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");

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

module.exports = initializeServer;
