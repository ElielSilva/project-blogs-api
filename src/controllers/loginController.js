const loginService = require('../services/loginService');
const generateToken = require('../helpers/generateToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' }); 
    }
    const { id, displayName, code, message } = await loginService.login(email, password);
    if (code) { 
      return res.status(code).json({ message }); 
    }
    // console.log(userData);
    const token = await generateToken({ id, displayName });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};
