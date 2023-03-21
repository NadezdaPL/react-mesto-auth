class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }
  
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
      return Promise.reject(response);
    }
  
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
  
  getInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }
  
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  
  addInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`,
      }),
    });
  }
  
  createCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    });
  }
  
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        headers: this._headers,
          method: "PUT",
      });
    } else {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        headers: this._headers,
        method: "DELETE",
      });
    }
  }
  
  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }
  
  addAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "7b9e1f3e-ea14-4843-8c77-09b44113828b",
    "Content-Type": "application/json",
  },
});

export default api;