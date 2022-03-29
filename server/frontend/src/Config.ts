let HOST;
if (process.env.NODE_ENV === "development") {
  HOST = "http://localhost:3001/";
} else {
  HOST = "https://app.nackad.at/";
}
const Config = {
  Auth: {
    LOGIN_URL: HOST + "api/v1/auth/signin",
    SIGNIN_URL: HOST + "api/v1/auth/signup",
    UPDATE_ROLE_URL: "/auth/updateUserRole",
  },
  User: {
    ALL_URL: HOST + "api/v1/user/all",
    SELF_URL: HOST + "api/v1/user",
    DEPOSIT_BYID: HOST + "api/v1/user",
    EMPLOYEES: HOST + "api/v1/user/employees",
    ADMINS: HOST + "api/v1/user/admins",
    UPDATE: HOST + "api/v1/user/update",
    SEARCH: HOST + "api/v1/user/search",
  },
  Delivery: {
    ALLOPEN_URL: HOST + "api/v1/delivery/open",
    ALL: HOST + "api/v1/delivery/open",
    DEPOSIT_BYID: HOST + "api/v1/deposit/",
  },
  Deposit: {
    UPDATE: HOST + "api/v1/deposit/update",
  },
  Settings: {
    GET: HOST + "api/v1/settings/admin",
    STATISTICS: HOST + "api/v1/statistics",
    POST: HOST + "api/v1/settings/update",
  },
};

export default Config;
