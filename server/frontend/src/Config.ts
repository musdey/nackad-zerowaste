const Config = {
  Auth: {
    LOGIN_URL: "http://localhost:3000/api/v1/auth/signin",
    SIGNIN_URL: "http://localhost:3000/api/v1/auth/signup",
    UPDATE_ROLE_URL: "/auth/updateUserRole",
  },
  User: {
    ALL_URL: "http://localhost:3000/api/v1/user/all",
    SELF_URL: "http://localhost:3000/api/v1/user",
    DEPOSIT_BYID: "http://localhost:3000/api/v1/user",
  },
  Delivery: {
    ALLOPEN_URL: "http://localhost:3000/api/v1/delivery/open",
    DEPOSIT_BYID: "http://localhost:3000/api/v1/deposit/",
  },
  Settings: {
    GET: "http://localhost:3000/api/v1/settings/admin",
    POST: "http://localhost:3000/api/v1/settings/update",
  },
};

export default Config;
