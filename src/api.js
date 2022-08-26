const express = require('express');

// ...

// ----------------------------------------------------------------
const authMiddleware = require('./middlewares/auth');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
// ----------------------------------------------------------------

const app = express();

app.use(express.json());

// ...

// ----------------------------------------------------------------
app.post('/login', loginController.login);
app.post('/user', userController.createUser);
app.get('/user', authMiddleware, userController.getAll);
app.get('/user/:id', authMiddleware, userController.getById);
// ----------------------------------------------------------------

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`//
module.exports = app;
