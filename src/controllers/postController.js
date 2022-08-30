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
    const { id } = req.params;
    const user = await postService.getByIdPost(id);
    if (!user) return res.status(404).json({ message: 'Post does not exist' });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

const updateByIdPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, data, message } = await postService.updateByIdPost(id, req.body, req.id);
    if (!data) return res.status(code).json({ message });
    res.status(code).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const seachByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const { code, data, message } = await postService.seachByQuery(q);
    if (!data) return res.status(code).json({ message });
    res.status(code).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteByIdPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, data, message } = await postService.deleteByIdPost(id, req.id);
    if (!data) return res.status(code).json({ message });
    res.status(code).json();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createPost,
  getAllPost,
  getByIdPost,
  updateByIdPost,
  seachByQuery,
  deleteByIdPost,
};
