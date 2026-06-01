const Joi = require('joi');

const constants = require('../constants');

const { PASSWORD_MAX, PASSWORD_MIN } = constants;

const schema = Joi.object({
  username: Joi.string().email({ tlds: { allow: true } }),
  password: Joi.string().min(PASSWORD_MIN).max(PASSWORD_MAX),
});

module.exports = async function validate(req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.forEach(({ path: [key], type }) => {
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`];
    });
    req.session.messages = { errors };
    return res.status(400).redirect('/login');
  }

  return next();
};
