const sendResponse = (
  res,
  statusCode,
  status,
  message,
  isDataPresent = null
) => {
  const response = {
    status: status,
    message: message,
  };
  if (isDataPresent) {
    response.data = isDataPresent;
  }
  res.status(statusCode).json(response);
};

export default sendResponse;
