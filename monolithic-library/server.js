const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// ✅ ตรงนี้คือหัวใจ (เชื่อม UI)
app.use(express.static(path.join(__dirname, '..', 'public')));

// routes
const bookRoutes = require('./presentation/routes/book.routes');
app.use('/api/books', bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Library Management System running on http://localhost:${PORT}`);
});
