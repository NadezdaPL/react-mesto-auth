const BASE_URL = "https://auth.nomoreparties.co";

function makeRequest(url, method, body, token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
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
    : Promise.reject(`Error: ${response.status} ${response.statusText}`)
  });
}

export function register({ email, password }) {
  return makeRequest("/signup", "POST", { email, password });
};

export function authorize({ email, password }){
  return makeRequest("/signin", "POST", { email, password });
};

export function checkToken(token)  {
  return makeRequest("/users/me", "GET", undefined, token);
};

// class Api {
//   constructor({ baseUrl }) {
//     this._baseUrl = baseUrl;
//   }

//   checkResponse = (res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   };

//   register = (email, password) => {
//     return fetch(`${this._baseUrl}/signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     }).then((res) => {
//        return this.checkResponse(res)
//     });
//   };

//   authorize = (email, password) => {
//     return fetch(`${this._baseUrl}/signin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     }).then((res) => this.checkResponse(res))
//   };

//   checkToken = (token) => {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => this.checkResponse(res));
//   };
// }

// export const auth = new Api({
//   baseUrl: "https://auth.nomoreparties.co",
// });
