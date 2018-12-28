const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfile(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.imgUrl = !isEmpty(data.imgUrl) ? data.imgUrl : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!isEmpty(data.imgUrl)) {
    if (!Validator.isURL(data.imgUrl)) {
      errors.imgUrl = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
