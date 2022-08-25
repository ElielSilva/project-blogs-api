const express = require('express');

// ...

// ---------------------------------------------------------------- EU
const loginController = require('./controllers/loginController')
// ---------------------------------------------------------------- EU


const app = express();

app.use(express.json());

// ...

// ---------------------------------------------------------------- EU
app.post('/login', loginController.login)
// ---------------------------------------------------------------- EU

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`//
module.exports = app;
