const { Joi } = require("express-validation");

const loginUserValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = loginUserValidation;
