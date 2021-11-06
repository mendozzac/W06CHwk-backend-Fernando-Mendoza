const debug = require("debug")("robots:database");
const chalk = require("chalk");
const { Mongoose } = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    Mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.red("La base de datos, que no va."));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Se está conectando la base de datos."));
      resolve();
    });
  });

module.exports = connectDB;
