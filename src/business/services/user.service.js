const repo = require('../../data/repositories/book.repository');
const { validateBook } = require('../validators/book.validator');

exports.getAll = async (status) => {
  const books = await repo.findAll(status);

  const available = books.filter(b => b.status === 'available').length;
  const borrowed = books.filter(b => b.status === 'borrowed').length;

  return {
    books,
    statistics: { available, borrowed, total: books.length }
  };
};

exports.create = async (data) => {
  validateBook(data);
  return repo.create(data);
};

exports.borrow = async (id) => {
  const book = await repo.findById(id);
  if (!book) throw new Error('Book not found');
  if (book.status === 'borrowed') throw new Error('Book already borrowed');

  await repo.updateStatus(id, 'borrowed');
  return repo.findById(id);
};
