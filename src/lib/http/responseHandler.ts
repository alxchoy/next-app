type HttpResponse<T> = {
  status: number;
  data: T;
  error: Error;
};

export const successResponse = ({}) => {
  return new Response();
};
