import Config from "../Config";
import { ShopifyOrder } from "./types";

const getUserData = async (): Promise<any> => {
  //   const url = `${protocol + host + port}/api/v1/test/user`;
  const url = Config.User.SELF_URL;
  try {
    const result = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
    });
    const body = await result.json();

    return body;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getShopifyOrder = async (
  id: string
): Promise<ShopifyOrder | undefined> => {
  //   const url = `${protocol + host + port}/api/v1/test/user`;
  const url = Config.Order.GET;
  try {
    const result = await fetch(url + id, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
    });
    const body = await result.json();

    return body as ShopifyOrder;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getStatistics = async (): Promise<any> => {
  //   const url = `${protocol + host + port}/api/v1/test/user`;
  const url = Config.Settings.STATISTICS;
  try {
    const result = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
    });
    const body = await result.json();

    return body;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  pin: string,
  password: string
): Promise<any> => {
  const obj = { firstName, lastName, email, pin, password };
  //const url = `${protocol + host + port}/api/v1/auth/signup`;
  const url = Config.Auth.SIGNIN_URL;
  try {
    const result = await fetch(url, {
      method: "post",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });
    const body = await result.json();
    return { status: result.status, body: body };
  } catch (err) {
    console.log(err);
  }
};

const signin = async (email: string, password: string): Promise<any> => {
  const obj = { email, password };
  //const url = `${protocol + host + port}/api/v1/auth/signin`;
  const url = Config.Auth.LOGIN_URL;
  const result = await fetch(url, {
    method: "post",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  });
  // Status 200
  if (result.ok) {
    return await result.json();
  }

  // Error status
  let data;
  try {
    data = await result.json();
  } catch (err) {
    throw new Error(result.statusText);
  }
  throw new Error(data.message);
};

const getUser = async (shopId: string): Promise<any> => {
  const url = Config.User.SELF_URL;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, { method: "GET" });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
  }
};

const getCurrentDeliveries = async (): Promise<any> => {
  const url = Config.Delivery.ALLOPEN_URL;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getAllDeliveries = async (): Promise<any> => {
  const url = Config.Delivery.ALL;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getDepositByUserId = async (userId: string): Promise<any> => {
  const url = Config.User.DEPOSIT_BYID;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url + "/" + userId + "/deposit", {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
  }
};

const getDepositItems = async (depositId: string): Promise<any> => {
  const url = Config.Delivery.DEPOSIT_BYID;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url + depositId, {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
  }
};

const getSettings = async (): Promise<any> => {
  const url = Config.Settings.GET;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
  }
};

const updateSettings = async (obj: any): Promise<any> => {
  const url = Config.Settings.POST;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify(obj),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const getEmployees = async (): Promise<any> => {
  const url = Config.User.EMPLOYEES;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getAdmins = async (): Promise<any> => {
  const url = Config.User.ADMINS;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const updateUserRole = async (userId: string, role: string): Promise<any> => {
  const url = Config.User.UPDATE;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ userId, role }),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const searchUser = async (data: string): Promise<any> => {
  const url = Config.User.SEARCH;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ searchString: data }),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const returnDeposit = async (
  userId: string,
  deliveryId: string,
  returnedItems: [
    { amount: number; id: string; depositTypeId?: string; depositName?: string }
  ]
): Promise<any> => {
  const url = Config.Deposit.RETURN;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ userId, deliveryId, returnedItems }),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const addNewDeposit = async (
  userId: string,
  type: string,
  amount: string,
  depositTypeId?: string,
  depositId?: string
): Promise<any> => {
  const url = Config.Deposit.ADDNEW;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ userId, type, amount, depositTypeId, depositId }),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const getAggregatedDeposit = async (userId: string): Promise<any> => {
  const url = Config.Deposit.GETAGGREGATED + "/" + userId;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const searchDelivery = async (query: string): Promise<any> => {
  const url = Config.Delivery.SEARCH;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ query }),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const getDepositTypes = async (): Promise<any> => {
  const url = Config.Deposit.GETTYPES;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const getDeliverySlots = async (): Promise<any> => {
  const url = Config.Delivery.GETSLOTS;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const updateDeliverySlots = async (
  deliverySlotId: string,
  action: string
): Promise<any> => {
  const addUrl = Config.Delivery.SLOTADD;
  const removeUrl = Config.Delivery.SLOTREMOVE;
  const url = action === "ADD" ? addUrl : removeUrl;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ deliverySlotId }),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    return undefined;
  }
};

const apiObj = {
  signin,
  signup,
  getUser,
  getUserData,
  getCurrentDeliveries,
  getAllDeliveries,
  getDepositByUserId,
  getDepositItems,
  getSettings,
  updateSettings,
  getEmployees,
  getAdmins,
  updateUserRole,
  searchUser,
  returnDeposit,
  addNewDeposit,
  getStatistics,
  getShopifyOrder,
  getAggregatedDeposit,
  searchDelivery,
  getDepositTypes,
  getDeliverySlots,
  updateDeliverySlots,
};
export default apiObj;
