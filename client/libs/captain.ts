import { environment } from "./environment";

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

const fn = async (url: string, options: any) => {
  let data;
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  return { data, ok: res.ok, status: res.status, statusText: res.statusText };
};

const fetcher = async (url: string, method: FetchMethod = "GET", payload: any = undefined) => {
  const options: RequestInit = {
    method,
    credentials: "include",
  };

  const headersInit: HeadersInit = {
    accepts: "application/json",
  };

  options.headers = headersInit;

  if (payload !== undefined) {
    options.headers["Content-Type"] = "application/json";
  }

  if (payload !== undefined) {
    options.body = JSON.stringify(payload);
  }

  let res = await fn(url, { ...options });

  if (res.status === 401) {
    const refresh = await fn(`${environment.apiUrl}/api/auth/refresh`, {
      ...options,
      method: "POST",
      body: "",
    });
    if (refresh.ok) {
      res = await fn(url, { ...options });
    }
  }

  return res;
};

async function get(url: string) {
  return await fetcher(url);
}
async function post(url: string, payload: any) {
  return await fetcher(url, "POST", payload);
}
async function put(url: string, payload: any) {
  return await fetcher(url, "PUT", payload);
}
async function del(url: string) {
  return await fetcher(url, "DELETE");
}

function captain() {
  return {
    get,
    post,
    put,
    delete: del,
  };
}

export default captain();
