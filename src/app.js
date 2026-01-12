const express = require('express');
const bookRoutes = require('./presentation/routes/book.routes');
const errorMiddleware = require('./presentation/middlewares/error.middleware');

const app = express();
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use(errorMiddleware);

module.exports = app;
