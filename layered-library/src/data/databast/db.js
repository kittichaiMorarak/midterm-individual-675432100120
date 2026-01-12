const Database = require('better-sqlite3');
const path = require('path');

// Create database
const db = new Database(path.join(__dirname, '../../library.db'));

// Create books table
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'available'
  )
`);

// Insert sample data if table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM books').get();
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO books (title, author, isbn, status) 
    VALUES (?, ?, ?, ?)
  `);
  
  // Sample books
  const sampleBooks = [
    ['Clean Code', 'Robert C. Martin', '978-0132350884', 'available'],
    ['Design Patterns', 'Gang of Four', '978-0201633610', 'available'],
    ['The Pragmatic Programmer', 'Andrew Hunt', '978-0135957059', 'available'],
    ['Refactoring', 'Martin Fowler', '978-0201485677', 'borrowed'],
    ['Clean Architecture', 'Robert C. Martin', '978-0134494166', 'available'],
    ['Domain-Driven Design', 'Eric Evans', '978-0321125217', 'available'],
    ['Head First Design Patterns', 'Eric Freeman', '978-0596007126', 'borrowed'],
    ['Working Effectively with Legacy Code', 'Michael Feathers', '978-0131177055', 'available'],
    ['The Clean Coder', 'Robert C. Martin', '978-0137081073', 'available'],
    ['Effective Java', 'Joshua Bloch', '978-0134685991', 'available']
  ];
  
  const insertMany = db.transaction((books) => {
    for (const book of books) {
      insert.run(...book);
    }
  });
  
  insertMany(sampleBooks);
  console.log('✅ Sample data inserted!');
}

module.exports = db;