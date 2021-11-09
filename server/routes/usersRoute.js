const express = require("express");
const { validate } = require("express-validation");
const checkLogin = require("../controller/userController");
const loginUserValidation = require("../schema/userSchema");

const router = express.Router();

router.post("/login", validate(loginUserValidation), checkLogin);

module.exports = router;
