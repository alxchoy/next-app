import { HttpResponse } from "@/lib/http/httpClient";
import { HttpError } from "@/lib/http/httpErrors";
import { useCallback, useState } from "react";

type FetchRequestFn<Req, Res> = (req: Req) => Promise<HttpResponse<Res>>;

type FetchOptions = {
  isImmediately?: boolean;
};

export function useFetch<Req, Res>(
  requestFn: FetchRequestFn<Req, Res>,
  { isImmediately = false }: FetchOptions = {}
) {
  const [data, setData] = useState<Res | null>();
  const [error, setError] = useState<HttpError | null>();
  const [isLoading, setLoading] = useState(false);

  const fetcher = useCallback(
    async (req: Req): Promise<HttpResponse<Res> | undefined> => {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const res = await requestFn(req);
        res.success
          ? setData(res.data)
          : setError({
              name: res.error?.name!,
              message: res.error?.message!,
              statusCode: res.error?.statusCode!,
            });

        if (!isImmediately) return { ...res };
      } catch (err) {
        setError(err as HttpError);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, isLoading, fetcher };
}
