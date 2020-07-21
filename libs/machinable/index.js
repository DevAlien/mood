import btoa from "./btoa";

const LOGIN = "/sessions/";
const REGISTER = "/users/register";
const REFRESH = "/sessions/refresh";
const DELETE_SESSION = "/sessions/{sid}";
const BASE_URL = "https://{name}.machinable.io";
class MachinableClient {
  constructor(name, options = { tokens: false }) {
    this.name = name;
    this.apiEndPoint = BASE_URL.replace("{name}", name);
    if (options.tokens) {
      this.tokens = options.tokens;
    }

    if (options.onSetTokens) {
      this.onSetTokens = options.onSetTokens;
    }

    if (options.onLogout) {
      this.onLogout = options.onLogout;
    }

    if (options.url) {
      this.apiEndPoint = options.url;
    }
  }

  getRefreshToken() {
    return this.tokens && this.tokens.refresh_token;
  }

  getAccessToken() {
    return this.tokens && this.tokens.access_token;
  }

  getAuthHeaders() {
    return { Authorization: "Bearer " + this.getAccessToken() };
  }

  getRefreshHeaders() {
    return { Authorization: "Bearer " + this.getRefreshToken() };
  }

  setTokens(tokens) {
    this.tokens = tokens;
  }

  _setTokens(tokens) {
    this.tokens = tokens;
    if (this.onSetTokens) {
      this.onSetTokens(tokens);
    }
  }

  manageAuthRequestError(response, args) {
    console.log(response);
    return response
      .json()
      .then((body) => {
        if (body && body.error === "invalid access token") {
          return this.refreshToken();
        }
        console.log(body);
      })
      .then((response) => {
        console.log("res", response);
        if (response && !response.error) {
          this._setTokens({
            ...(this.tokens || {}),
            access_token: response.access_token,
          });
          return this.api(...args);
        }

        if (response && response.error) throw new Error(response.error);
      });
  }

  login(username, password) {
    var encoded = btoa(username + ":" + password);
    var headers = { Authorization: "Basic " + encoded };
    return this.request(LOGIN, "post", {}, headers).then((response) =>
      this._setTokens(response)
    );
  }

  logout() {
    return new Promise((resolve) => {
      this.deleteCurrentSession(() => {
        this.tokens = false;
        if (this.onLogout) {
          this.onLogout();
        }
        resolve();
      });
    });
  }
  register(username, password, read = true, write = true) {
    return this.request(REGISTER, "post", {
      username: username,
      password: password,
      read: read,
      write: write,
    });
  }

  refreshToken() {
    return this.request(REFRESH, "post", {}, this.getRefreshHeaders());
  }

  deleteCurrentSession(success, error) {
    const sid = this.tokens && this.tokens.session_id;
    if (sid) {
      var URL = DELETE_SESSION.replace("{sid}", sid);
      return this.request(URL, "delete", false, this.getAuthHeaders())
        .then(success)
        .catch((e) => {
          console.log(e);
          success();
          return error && error(e);
        });
    }
    success();
  }

  _request(path, method, body, headers = {}) {
    let options = {
      method: method,

      headers: headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(this.apiEndPoint + path, options);
  }

  request(path, method, body, headers = {}) {
    let options = {
      method: method,

      headers: headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    let mainResponse;
    return fetch(this.apiEndPoint + path, options)
      .then((response) => {
        mainResponse = response;

        return response.json();
      })
      .then((response) => {
        if (mainResponse && mainResponse.status === 404) {
          throw new Error(response.error);
        }

        return response;
      });
  }

  api(path, method = "get", body) {
    const args = arguments;
    return this._request(
      "/api" + path,
      method,
      body,
      this.getAuthHeaders()
    ).then((response) => {
      console.log("response", response.status);

      if (response.status === 401) {
        return this.manageAuthRequestError(response, args);
      } else return response.json();
    });
  }
}

export default MachinableClient;
