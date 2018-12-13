const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateItem(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.importance = !isEmpty(data.importance) ? data.importance : "";

  if (!Validator.isLength(data.title, { min: 2 })) {
    errors.title = "Title must be at least 2 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
