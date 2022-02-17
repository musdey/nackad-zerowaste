import Config from "../Config";

// in src/authProvider.js
const authProvider = {
  login: (email: string, password: string) => {
    const request = new Request(Config.Auth.LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
      });
  },
};

export default authProvider;
