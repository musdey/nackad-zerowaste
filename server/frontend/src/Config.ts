let HOST;
if (process.env.NODE_ENV === "development") {
  HOST = "http://localhost:3000/api/v1/";
} else {
  HOST = "https://app.nackad.at/api/v1/";
}
const Config = {
  Auth: {
    LOGIN_URL: HOST + "auth/signin",
    SIGNIN_URL: HOST + "auth/signup",
    UPDATE_ROLE_URL: "auth/updateUserRole",
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
  },
};

export default Config;
