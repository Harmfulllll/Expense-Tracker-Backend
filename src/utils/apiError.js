class apiError extends Error {
  constructor(
    statusCode,
    message = "Something is wrong here",
    errors = [],
    stack = ""
  ) {
    super(message);
    (this.statusCode = statusCode),
      (this.message = message),
      (this.success = false),
      (this.data = null),
      (this.errors = errors);

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
export default apiError;
