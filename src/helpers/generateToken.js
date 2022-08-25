const jwt = require('jsonwebtoken');

const JWT_SECRET = 'suaSenhaSecreta';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = ({ displayName, password }) => {
  const token = jwt.sign({ displayName, password }, JWT_SECRET, jwtConfig);
  return token;
};
