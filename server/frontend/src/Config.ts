const Config = {
  Auth: {
    LOGIN_URL: "http://localhost:3000/api/v1/auth/signin",
    SIGNIN_URL: "http://localhost:3000/api/v1/auth/signup",
    UPDATE_ROLE_URL: "/auth/updateUserRole",
  },
  User: {
    ALL_URL: "http://localhost:3000/api/v1/user/all",
    SELF_URL: "http://localhost:3000/api/v1/user",
  },
  Delivery: {
    ALLOPEN_URL: "http://localhost:3000/api/v1/delivery/open",
  },
};

export default Config;
