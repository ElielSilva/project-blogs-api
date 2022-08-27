const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = ({ id, displayName }) => {
  const token = jwt.sign({ id, displayName }, process.env.JWT_SECRET, jwtConfig);
  return token;
};
