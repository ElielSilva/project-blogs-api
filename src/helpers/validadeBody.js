const Joi = require('joi');

const schemaBody = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemaCategoryName = Joi.object({
  name: Joi.string().required(),
});

const schemaUpDatePost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const schemaBlogPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

function validatePropety(listSales, schema) {
  const { error } = schema.validate(listSales);
  if (!error) return false;
  return error.details[0].message;
}

// console.log(
//   validatePropety(
//     {
//       title: 'Latest updates, August 1st',
//       content: 'The whole text for the blog post goes here in this key',
//       categoryIds: [1, 2],
//     },    
//     schemaBlogPost,
// ),
// );

module.exports = { 
  validatePropety, 
  schemaBody, 
  schemaCategoryName, 
  schemaBlogPost,
  schemaUpDatePost,
};