const service = require('../../business/services/book.service');

exports.getBooks = async (req, res, next) => {
  try {
    const result = await service.getAll(req.query.status);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = await service.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const book = await service.borrow(Number(req.params.id));
    res.json(book);
  } catch (err) {
    next(err);
  }
};
