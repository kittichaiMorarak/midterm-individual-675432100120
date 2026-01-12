exports.validateBook = ({ title, author, isbn }) => {
  if (!title || !author || !isbn) {
    throw new Error('Title, author, and ISBN are required');
  }

  const pattern = /^(97[89])?\d{9}[\dXx]$/;
  if (!pattern.test(isbn.replace(/-/g, ''))) {
    throw new Error('Invalid ISBN format');
  }
};
