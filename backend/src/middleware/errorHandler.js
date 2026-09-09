import env from "../config/env.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response = {
    success: false,
    message,
  };

  if (err.errors && err.errors.length > 0) {
    response.errors = err.errors;
  }

  if (env.nodeEnv === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;