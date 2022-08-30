const { Category } = require('../database/models');
const validateBody = require('../helpers/validadeBody');

const createCategory = async (name) => {
  const validateName = validateBody
    .validatePropety(name, validateBody.schemaCategoryName);
  if (validateName) return { code: 400, message: validateName };
  const data = await Category.create(name);
  return { code: 201, data };
};

const getAllCategories = async () => {
  const dataCategories = await Category.findAll();
  return dataCategories;
};

module.exports = { 
  createCategory, 
  getAllCategories,
};