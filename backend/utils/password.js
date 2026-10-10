const MIN_LENGTH = 10;

const validatePasswordStrength = (password = "") => {
  const value = String(password);
  const isValid =
    value.length >= MIN_LENGTH &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value);

  return {
    isValid,
    message: isValid
      ? ""
      : "Password must be at least 10 characters and include uppercase, lowercase, number and special character.",
  };
};

module.exports = { validatePasswordStrength };
