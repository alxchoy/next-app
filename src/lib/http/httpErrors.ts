export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestError";
    this.message = message;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
    this.message = message;
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
    this.name = "InternalServerError";
  }
}
