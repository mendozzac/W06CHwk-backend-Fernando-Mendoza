const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: {
    speed: {
      type: Number,
      required: true,
    },
    stamina: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
});

const Robot = model("Robot", robotSchema);

module.exports = Robot;
