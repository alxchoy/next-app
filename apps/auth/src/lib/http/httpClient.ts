import { errorHandler, HttpError } from "./httpErrors";

export interface HttpResponse<T> {
  data?: T;
  error?: HttpError;
  success: boolean;
}

type HttpOptions = Omit<BodyInit, "body" | "method">;

class HttpClient {
  constructor() {
    console.log("instance HTTPClient");
  }

  get(url: string, options?: HttpOptions) {
    return this.fetcher(url, { method: "GET", ...options });
  }

  post<T, B = unknown>(
    url: string,
    body: B,
    options?: HttpOptions
  ): Promise<HttpResponse<T>> {
    return this.fetcher(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  }

  private async fetcher<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    try {
      const res = await fetch(url, config);
      if (!res.ok) throw await errorHandler(res);
      const resData = await res.json();
      return { data: resData.data || resData, success: true };
    } catch (err) {
      if (err instanceof HttpError) {
        return { error: err, success: false };
      }

      throw err;
    }
  }
}

const httpClient = new HttpClient();

export default httpClient;
