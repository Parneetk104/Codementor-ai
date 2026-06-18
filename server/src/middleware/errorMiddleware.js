import env from "../config/env.js";

const notFoundHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (error, req, res, next) => {
  console.error(`[${new Date().toISOString()}]`, error);

  const statusCode = error.statusCode || 500;

  const isInternalServerError = statusCode === 500;

  const message =
    env.isProduction && isInternalServerError
      ? "Internal server error"
      : error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export {
  notFoundHandler,
  errorHandler,
};