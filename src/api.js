const express = require('express');

// ...

// ----------------------------------------------------------------
const bodyPostMiddle = require('./middlewares/bodyPost');
const authMiddleware = require('./middlewares/auth');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');
// ----------------------------------------------------------------

const app = express();

app.use(express.json());

// ...

// ----------------------------------------------------------------
app.post('/login', loginController.login);
app.post('/user', userController.createUser);
app.get('/user', authMiddleware, userController.getAll);
app.get('/user/:id', authMiddleware, userController.getById);
app.post('/categories', authMiddleware, categoriesController.createCategory);
app.get('/categories', authMiddleware, categoriesController.getAllCategories);
app.post('/post', authMiddleware, bodyPostMiddle, postController.createPost);
app.get('/post', authMiddleware, postController.getAllPost);
app.get('/post/:id', authMiddleware, postController.getByIdPost);
// ----------------------------------------------------------------

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`//
module.exports = app;
