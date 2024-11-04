class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

class BadRequest extends HttpError {
  constructor() {
    super("Bad request error", 400);
  }
}

class InternalError extends HttpError {
  constructor() {
    super("Internal server error", 500);
  }
}
