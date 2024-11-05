import { useEffect, useState } from "react";

export function useFetch(requestFn: () => Promise<any>) {
  const [data, setData] = useState();

  const fetcher = async () => {
    const res = await requestFn();
    console.log("RES:: ", res);
  };

  // useEffect(() => {}, []);

  return { data, fetcher };
}
