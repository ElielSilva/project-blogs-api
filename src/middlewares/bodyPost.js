const validateBody = require('../helpers/validadeBody');

module.exports = (req, res, next) => {
  try {
    // console.log(true,true,true,true,true,true,true,true,true,true)
    const validateName = validateBody.validatePropety(req.body, validateBody.schemaBlogPost);
    if (validateName) return res.status(400).json({ message: 'Some required fields are missing' });
    next();
  } catch (error) {
    console.error(error);
  }
};
