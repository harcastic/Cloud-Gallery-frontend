const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const request = async (
  url,
  method = "GET",
  body = null,
  isForm = false
) => {
  const token = localStorage.getItem("token");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  const options = {
    method,
    signal: controller.signal,
    headers: {
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  };

  if (body) {
    if (isForm) {
      options.body = body;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  try {
    const res = await fetch(BASE_URL + url, options);
    clearTimeout(timeout);

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      throw new Error(data.msg || "Request failed");
    }

    return data;

  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out");
    }

    throw new Error("Server unreachable");
  }
};