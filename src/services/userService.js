const { User } = require('../database/models');
const validateBody = require('../helpers/validadeBody');
const generateToken = require('../helpers/generateToken');

const createUser = async (data) => {
  const { displayName, email, password } = data;
  const dataValidateBody = validateBody
    .validatePropety({ displayName, email, password }, validateBody.schemaBody);
  if (dataValidateBody) return { code: 400, message: dataValidateBody };
  const user = await User.findOne({ where: { email } });
  if (user) {
    return { code: 409, message: 'User already registered' };
  }
  await User.create(data);
  const token = await generateToken({ email, password });
  return { code: 201, token };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const data = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!data) return { code: 404, message: 'User does not exist' };
  return { code: 200, data: data.dataValues };
};

module.exports = { 
  createUser, 
  getAll,
  getById,
};