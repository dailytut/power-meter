const Joi = require('joi');

const constants = require('../constants');

const { NAME_MIN, NAME_MAX, PASSWORD_MAX, PASSWORD_MIN } = constants;

const schema = Joi.object({
  name: Joi.string().min(NAME_MIN).max(NAME_MAX).required(),
  password: Joi.string().min(PASSWORD_MIN).max(PASSWORD_MAX),
  username: Joi.string().email({ tlds: { allow: true } }),
});

async function validateRegisterPayload(req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.forEach(({ path: [key], type }) => {
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`];
    });
    req.session.messages = { errors };
    return res.status(400).redirect('/register');
  }

  return next();
}

module.exports = validateRegisterPayload;
