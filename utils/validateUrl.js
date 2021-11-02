const validator = require('validator');

const validateUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

module.exports = validateUrl;
