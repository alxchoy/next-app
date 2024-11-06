import { HttpResponse } from "@/lib/http/httpClient";
import { useReducer, useState } from "react";

type FetchRequest<Req, Res> = (req: Req) => Promise<HttpResponse<Res>>;

export function useFetch<Req, Res>(requestFn: FetchRequest<Req, Res>) {
  const [data, setData] = useState<Res>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetcher = async (req: Req) => {
    try {
      setLoading(true);
      const res = await requestFn(req);
      res.success ? setData(res.data) : setError(res.error?.message!);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, isLoading, fetcher };
}
