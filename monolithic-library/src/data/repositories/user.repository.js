const db = require('../database/sqlite');

exports.findAll = (status) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM books';
    let params = [];

    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.create = (book) => {
  return new Promise((resolve, reject) => {
    const { title, author, isbn } = book;
    db.run(
      'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)',
      [title, author, isbn],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...book, status: 'available' });
      }
    );
  });
};

exports.updateStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE books SET status = ? WHERE id = ?',
      [status, id],
      (err) => (err ? reject(err) : resolve())
    );
  });
};
