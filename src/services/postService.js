const Sequelize = require('sequelize');
const { Category, BlogPost, User, PostCategory } = require('../database/models');
const validatePropety = require('../helpers/validadeBody');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateCategoryIds = async (ids) => {
  const result = await Category.findAll({
    where: {
        id: ids,
    },
  });
  return result;
};

const createPost = async (body, id) => {
  try {
    const { title, content, categoryIds } = body;
    const result = await validateCategoryIds(categoryIds); 
    if (result.length !== categoryIds.length) {
      return { code: 400, message: '"categoryIds" not found' };
    }
    const resultTrasion = await sequelize.transaction(async (t) => {
      const createdPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });
      const y = categoryIds.map((category) => ({ postId: createdPost.id, categoryId: category }));
      await PostCategory.bulkCreate(y, { transaction: t });
      return createdPost;
    });
    console.log(resultTrasion);
    return { code: 201, data: resultTrasion };
  } catch (error) {
    console.error(error.message);
  }
};

const getAllPost = async () => {
  try {
    const dataCategories = await BlogPost
    .findAll({ include: [
      { 
        model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'], 
      }, {
        model: Category, as: 'categories', attributes: ['id', 'name'],
      }] });
    return dataCategories;
  } catch (error) {
    console.log(error);
  }
};

const getByIdPost = async (id) => {
  try {
    const dataPost = await BlogPost
    .findByPk(id, { include: [
      { 
        model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'], 
      }, {
        model: Category, as: 'categories', attributes: ['id', 'name'],
      }] });
    return dataPost;
  } catch (error) {
    console.log(error);
  }
};

const updateByIdPost = async (postId, { title, content }, userId) => {
  try {
    const validate = validatePropety
      .validatePropety({ title, content }, validatePropety.schemaUpDatePost);
    if (validate) return { code: 400, message: 'Some required fields are missing' };
    const post = await BlogPost.findByPk(postId);
    if (post.userId !== userId) return { code: 401, message: 'Unauthorized user' };
    const [result] = await BlogPost.update({ title, content }, { where: { id: postId } });
    const data = await getByIdPost(result);
    return { code: 200, data };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { 
  createPost, 
  getAllPost,
  getByIdPost,
  updateByIdPost,
};