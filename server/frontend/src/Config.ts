let HOST;
if (process.env.NODE_ENV === "development") {
  HOST = "http://192.168.0.123:3000/api/v1/";
} else {
  HOST = "https://app.nackad.at/api/v1/";
}
const Config = {
  Auth: {
    LOGIN_URL: HOST + "auth/signin",
    SIGNIN_URL: HOST + "auth/signup",
    CREATE_PIN: HOST + "auth/createpin",
    UPDATE_ROLE_URL: HOST + "auth/updateUserRole",
    REQEUST_PW: HOST + "pw/reset-pw-request",
    CHECK_PW_TOKEN: HOST + "pw/reset-pw-check",
    RESET_PW: HOST + "pw/reset-pw",
  },
  User: {
    ALL_URL: HOST + "user/all",
    SELF_URL: HOST + "user",
    DEPOSIT_BYID: HOST + "user",
    EMPLOYEES: HOST + "user/employees",
    ADMINS: HOST + "user/admins",
    UPDATE: HOST + "user/update",
    SEARCH: HOST + "user/search",
  },
  Delivery: {
    ALLOPEN_URL: HOST + "delivery/open",
    ALL: HOST + "delivery/open",
    DEPOSIT_BYID: HOST + "deposit/",
    SEARCH: HOST + "delivery/search",
    GETSLOTS: HOST + "deliveryslots/detail",
    SLOTADD: HOST + "deliveryslot/add",
    SLOTREMOVE: HOST + "deliveryslot/remove",
  },
  Deposit: {
    RETURN: HOST + "deposit/return",
    ADDNEW: HOST + "deposit/add",
    GETAGGREGATED: HOST + "deposit/aggregated",
    GETTYPES: HOST + "deposit-types",
  },
  Settings: {
    GET: HOST + "settings/admin",
    STATISTICS: HOST + "statistics",
    POST: HOST + "settings/update",
  },
  Order: {
    GET: HOST + "order/",
    POST: HOST + "order/",
  },
};

export default Config;
