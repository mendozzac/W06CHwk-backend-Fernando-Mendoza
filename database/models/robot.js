const { Schema, model, Types } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
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
