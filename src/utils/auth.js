const BASE_URL = "https://auth.nomoreparties.co";

function makeRequest(url, method, body, token) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token !== undefined) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  return fetch(`${BASE_URL}${url}`, config).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
  });
}

export function register({ email, password }) {
  return makeRequest("/signup", "POST", { email, password });
}

export function authorize({ email, password }) {
  return makeRequest("/signin", "POST", { email, password });
}

export function checkToken(token) {
  return makeRequest("/users/me", "GET", undefined, token);
}
