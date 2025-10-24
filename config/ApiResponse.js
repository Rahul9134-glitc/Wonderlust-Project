
class ApiResponse {
  constructor({ res, statusCode = 200, success = true, message = "", data = null }) {
    res.status(statusCode).json({
      success,
      message,
      data,
    });
  }

  static success(res, message, data = null, statusCode = 200) {
    return new ApiResponse({ res, statusCode, success: true, message, data });
  }

  static error(res, message, statusCode = 500, data = null) {
    return new ApiResponse({ res, statusCode, success: false, message, data });
  }
}

export default ApiResponse;
