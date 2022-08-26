const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const { code, data, message } = await categoryService.createCategory(req.body);
    if (message) return res.status(code).json({ message });
    res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const user = await categoryService.getAllCategories();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
