const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const x = jwt.verify(authorization, process.env.JWT_SECRET);
    // console.log(x);
    req.id = x.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};
