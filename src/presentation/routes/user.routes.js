const express = require('express');
const controller = require('../controllers/book.controller');

const router = express.Router();

router.get('/', controller.getBooks);
router.post('/', controller.createBook);
router.patch('/:id/borrow', controller.borrowBook);

module.exports = router;
