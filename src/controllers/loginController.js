const loginService = require('../services/loginService');
const generateToken = require('../helpers/generateToken');

const login = async (req, res) => {
  // console.log('meu log ', req.body.email, req.body.password);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log(`entrou no se não ouver os campos ###### ${email} ${password}########     `);
      return res.status().json({ message: 'Some required fields are missing' }); 
    }
    const userData = await loginService.login(email, password);
    if (userData.code === 400) { 
      return res.status(userData.code).json({ message: userData.message }); 
    }
    const token = await generateToken(userData);
    // console.log('bora ------########## meu token ', token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};
