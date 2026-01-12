// presentation/routes/book.routes.js
const express = require('express');
const router = express.Router();

// ตัวอย่าง route เบื้องต้น
router.get('/', (req, res) => {
  res.send('Book route works!');
});

module.exports = router;
