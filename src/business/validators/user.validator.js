exports.validateUser = (data) => {
  if (!data.name) {
    throw new Error('Name is required');
  }

  if (!data.email) {
    throw new Error('Email is required');
  }
};
