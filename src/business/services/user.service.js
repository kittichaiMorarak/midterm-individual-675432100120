const userRepository = require('../../data/repositories/user.repository');
const { validateUser } = require('../validators/user.validator');

exports.create = async (data) => {
  validateUser(data);
  return userRepository.create(data);
};

exports.findAll = async () => {
  return userRepository.findAll();
};
