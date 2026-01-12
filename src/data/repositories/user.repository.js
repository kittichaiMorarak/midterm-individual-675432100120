const db = require('../database/db');

exports.create = (user) => {
  db.users.push(user);
  return user;
};

exports.findAll = () => {
  return db.users;
};
