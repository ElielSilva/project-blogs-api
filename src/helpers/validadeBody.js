const Joi = require('joi');

const schemaBody = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

function validatePropety(listSales, schema) {
  const { error } = schema.validate(listSales);
  if (!error) return false;
  return error.details[0].message;
}

module.exports = { validatePropety, schemaBody };