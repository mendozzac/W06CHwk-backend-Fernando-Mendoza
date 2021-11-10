const debug = require("debug")("robots:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret._v;
      },
    });

    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.red("La base de datos, que no va."));
        debug(chalk.red(error.message));
        reject();
      }
      debug(chalk.green("Se está conectando la base de datos."));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.yellow("Desconectado ed la base dedatos."));
    });
  });

module.exports = connectDB;
