// presentation/routes/book.routes.js
const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    status: "available"
  },
  {
    id: 2,
    title: "Design Patterns",
    author: "Gang of Four",
    isbn: "978-0201633610",
    status: "available"
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "978-0135957059",
    status: "borrowed"
  },
  {
    id: 4,
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "978-0201485677",
    status: "available"
  },
  {
    id: 5,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    isbn: "978-0134494166",
    status: "available"
  }
];

// Helper function to calculate statistics
function calculateStatistics(booksArray) {
  return {
    total: booksArray.length,
    available: booksArray.filter(b => b.status === 'available').length,
    borrowed: booksArray.filter(b => b.status === 'borrowed').length
  };
}

// GET all books
router.get('/', (req, res) => {
  try {
    const status = req.query.status;

    let filteredBooks = books;
    if (status && status !== 'all') {
      filteredBooks = books.filter(b => b.status === status);
    }

    // Always calculate statistics from ALL books, not filtered
    const statistics = calculateStatistics(books);

    res.json({
      books: filteredBooks,
      statistics: statistics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET book by ID
router.get('/:id', (req, res) => {
  try {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new book
router.post('/', (req, res) => {
  try {
    const { title, author, isbn } = req.body;

    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBook = {
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title,
      author,
      isbn,
      status: 'available'
    };

    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update book
router.put('/:id', (req, res) => {
  try {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const { title, author, isbn } = req.body;

    books[index] = {
      ...books[index],
      title: title || books[index].title,
      author: author || books[index].author,
      isbn: isbn || books[index].isbn
    };

    res.json(books[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE book
router.delete('/:id', (req, res) => {
  try {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const deletedBook = books.splice(index, 1)[0];
    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH borrow book
router.patch('/:id/borrow', (req, res) => {
  try {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status === 'borrowed') {
      return res.status(400).json({ error: 'Book is already borrowed' });
    }

    book.status = 'borrowed';
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH return book
router.patch('/:id/return', (req, res) => {
  try {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status === 'available') {
      return res.status(400).json({ error: 'Book is already available' });
    }

    book.status = 'available';
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;