const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const { code, data, message } = await postService.createPost(req.body, req.id);
    if (message) return res.status(code).json({ message });
    res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const user = await postService.getAllPost();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

const getByIdPost = async (req, res) => {
  try {
    const user = await postService.getByIdPost();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createPost,
  getAllPost,
  getByIdPost,
};
