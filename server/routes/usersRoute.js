const express = require("express");
const checkLogin = require("../controller/userController");

const router = express.Router();

router.post("/login", checkLogin);

module.exports = router;
