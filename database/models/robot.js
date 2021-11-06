const { Schema, model } = require("mongoose");

const petSchema = new Schema({
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

const Robot = model("Robot", petSchema);

module.exports = Robot;
