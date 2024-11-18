import { HttpResponse } from "./httpClient";
import { HttpError } from "./httpErrors";

export const successResponse = <T>({
  data,
  status = 200,
}: {
  data: T;
  status?: number;
}): Response => {
  const response: HttpResponse<T> = { data, success: true };

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
    success: false,
  };

  return Response.json(response, { status });
};
