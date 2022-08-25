const { User } = require('../database/models');
const validateBody = require('../helpers/validadeBody');
const generateToken = require('../helpers/generateToken');

const createUser = async (data) => {
  const { displayName, email, password } = data;
  const dataValidateBody = validateBody
    .validatePropety({ displayName, email, password }, validateBody.schemaBody);
  if (dataValidateBody) return { code: 400, message: dataValidateBody };
  const user = await User.findOne({ where: { email } });
  console.log('foi               ', user);
  if (user) {
    console.log('foi               asdasdasdasdasd');
    return { code: 409, message: 'User already registered' };
  }
  await User.create(data);
  const token = await generateToken({ email, password });
  return { code: 201, token };
};

module.exports = { createUser };