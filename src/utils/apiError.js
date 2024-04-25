class apiError extends Error {
  constructor(statusCode, message = "", errors = [], stack = "") {
    super(message);
    (this.statusCode = statusCode),
      (this.message = message),
      (this.success = false),
      (this.errors = errors);

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      errors: this.errors,
    };
  }
}
export default apiError;
