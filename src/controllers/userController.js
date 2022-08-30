const userService = require('../services/userService');
const { User } = require('../database/models');
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

const getAll = async (req, res) => {
  try {
    const user = await userService.getAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { code, data, message } = await userService.getById(req.params.id);
    if (message) return res.status(code).json({ message });
    res.status(code).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteByIdUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.id } });
    res.status(204).json({});
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteByIdUser,
};
