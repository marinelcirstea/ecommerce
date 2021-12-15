import { environment } from "./environment";

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

const fn = async (url: string, options: any) => {
  const res = await fetch(url, options);
  console.log("res", res);
  let data;
  try {
    data = await res.json();
  } catch {
    try {
      data = await res.text();
    } catch {}
  }

  console.log("data", data);
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
    await fn(`${environment.apiUrl}/api/auth/refresh`, {
      ...options,
      method: "POST",
      body: "",
    });

    res = await fn(url, { ...options });
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
