const userService = require('../services/userService');
// const validateBody = require('../helpers/validadeBody');

const createUser = async (req, res) => {
  try {
    // const { displayName, email, password } = req.body;
    // const dataValidateBody = validateBody
    //   .validatePropety({ displayName, email, password }, validateBody.schemaBody);
    // if (dataValidateBody) res.status(400).json({ message: dataValidateBody });

    const dataUser = await userService.createUser(req.body);
    if (dataUser.message) return res.status(dataUser.code).json({ message: dataUser.message });
    res.status(dataUser.code).json({ token: dataUser.token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};
