import { HttpError } from "./httpErrors";

export type HttpResponse<T> = {
  data?: T;
  error?: HttpError;
};

export const successResponse = <T>({
  data,
  status = 200,
}: {
  data: T;
  status?: number;
}): Response => {
  const response: HttpResponse<T> = { data };

  return Response.json(response, { status });
};

export const errorResponse = <T>({
  error,
  status = 400,
}: {
  error: HttpError;
  status?: number;
}): Response => {
  const { message, name } = error;
  const response: HttpResponse<T> = {
    error: { name, message, statusCode: error.statusCode || status },
  };

  return Response.json(response, { status });
};
