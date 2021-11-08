const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../../database/models/user");

const router = express.Router();

router.get("/", async () => {
  User.create({
    name: "Keiko",
    password: await bcrypt.hash("arribalafruta", 10),
  });
});

module.exports = router;
