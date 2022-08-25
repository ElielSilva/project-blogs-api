const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return { code: 400, message: 'Invalid fields' };
  }
  return user;
};

module.exports = {
  login,
};