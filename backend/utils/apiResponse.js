const sendResponse = (
  res,
  statusCode = 200,
  success = true,
  message = "",
  data = null,
  errors = null
) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (errors !== null) {
    response.errors = errors;
  }

  return res
    .status(statusCode)
    .json(response);
};

module.exports = {
  sendResponse,
};