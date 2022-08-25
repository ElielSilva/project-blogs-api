const loginService = require('../services/loginService');
const generateToken = require('../helpers/generateToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('email', typeof email, email === undefined, password === undefined);
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' }); 
    }
    const userData = await loginService.login(email, password);
    if (userData.code === 400) { 
      return res.status(userData.code).json({ message: userData.message }); 
    }
    const token = await generateToken(userData);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};
