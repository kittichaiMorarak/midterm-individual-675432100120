const express = require('express');
const userRoutes = require('./presentation/routes/user.routes');
const errorMiddleware = require('./presentation/middlewares/error.middleware');

const app = express();

app.use(express.json());

// routes
app.use('/users', userRoutes);

// error handler
app.use(errorMiddleware);

module.exports = app;
