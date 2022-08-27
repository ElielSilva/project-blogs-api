const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  // console.log(user)
  if (!user) {
    return { code: 400, message: 'Invalid fields' };
  }
  return user.dataValues;
};

module.exports = {
  login,
};