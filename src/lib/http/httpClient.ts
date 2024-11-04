class HttpClient {
  constructor() {}

  get() {}

  post() {}

  private async fetcher(url: string, options: RequestInit) {
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    try {
      const res = await fetch(url, config);

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "");
      }

      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }
}
