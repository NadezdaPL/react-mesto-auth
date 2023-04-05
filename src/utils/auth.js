// export const BASE_URL = "https://auth.nomoreparties.co";

// function makeRequest(url, method, body, token) {
//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   if (token !== undefined) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const config = {
//     method,
//     headers,
//   };

//   if (body !== undefined) {
//     config.body = JSON.stringify(body);
//   }

//   return fetch(`${BASE_URL}${url}`, config).then((response) => {
//     return response.ok
//     ? response.json()
//     : Promise.reject(`Error: ${res.status} ${res.statusText} `)
//   });
// }

// export const register = ({ email, password }) => {
//   return makeRequest("/signup", "POST", { email, password });
// };

// export const authorize = ({ email, password }) => {
//   return makeRequest("/signin", "POST", { email, password });
// };

// export const checkToken = (token) => {
//   return makeRequest("/users/me", "GET", undefined, token);
// };

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }

  register = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      return this._checkResponse(response);
    });
  };

  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => this._checkResponse(response));
  };

  checkToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkResponse(response));
  };
}

export const auth = new Api({
  baseUrl: "https://nomoreparties.co",
});
