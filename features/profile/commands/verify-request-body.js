const Joi = require('joi');

const constants = require('../constants');

const { NAME_MIN, NAME_MAX } = constants;

const schema = Joi.object({
  name: Joi.string().min(NAME_MIN).max(NAME_MAX).required(),
  username: Joi.string().email({ tlds: { allow: true } }),
});

async function validateProfilePayload(req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.forEach(({ message, path: [key], type }) => {
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`] || message;
    });
    req.session.messages = { errors };
    return res.status(400).redirect('/profile');
  }

  return next();
}

module.exports = validateProfilePayload;
