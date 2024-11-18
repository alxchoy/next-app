export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestError";
    this.message = message;
  }
}

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
    this.message = message;
  }
}

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
    this.name = "InternalServerError";
  }
}

export const errorHandler = async (res: Response) => {
  const data = await res.json();
  const errorMessage = data.error?.message || data.message || data.statusText;
  const mapErrors: Record<number, Error> = {
    400: new BadRequestError(errorMessage),
    404: new NotFoundError(errorMessage),
    500: new InternalServerError(errorMessage),
  };

  return mapErrors[res.status];
};
