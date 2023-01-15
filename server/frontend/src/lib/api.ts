import Config from "../Config";
import { ShopifyOrder } from "./types";

const getUserData = async (): Promise<{ success: boolean; data: any }> => {
  const url = Config.User.SELF_URL;
  try {
    const result = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
    });

    let data;
    if (result.ok) {
      const body = await result.json();
      data = { success: true, data: body };
      return data;
    } else if (result.status === 401) {
      data = { success: false, data: "Unauthorized" };
    } else {
      data = { success: false, data: "Unknown" };
    }
    return data;
  } catch (err) {
    return { success: false, data: err };
  }
};

const getShopifyOrder = async (
  id: string
): Promise<ShopifyOrder | undefined> => {
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

const updateShopifyOrder = async (
  id: string,
  order: ShopifyOrder
): Promise<ShopifyOrder | undefined> => {
  const url = Config.Order.POST;
  try {
    const result = await fetch(url + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify(order),
    });
    const body = await result.json();

    return body;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getStatistics = async (): Promise<any> => {
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
  password: string,
  shop: string
): Promise<any> => {
  const obj = { firstName, lastName, email, pin, password, shop };
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

const requestPW = async (email: string): Promise<boolean> => {
  const obj = { email };
  const url = Config.Auth.REQEUST_PW;
  const result = await fetch(url, {
    method: "post",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  });
  // Status 200
  if (result.ok) {
    return true;
  } else {
    return false;
  }
};

const chekPWToken = async (token: string): Promise<boolean> => {
  const url = Config.Auth.CHECK_PW_TOKEN;
  const result = await fetch(url + "/" + token, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  if (result.ok) {
    return true;
  } else {
    return false;
  }
};

const resetPW = async (token: string, pass: string): Promise<any> => {
  const obj = { token, pass };
  const url = Config.Auth.RESET_PW;
  const result = await fetch(url, {
    method: "post",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  });
  // Status 200
  if (result.ok) {
    return true;
  } else {
    return false;
  }
};

const getUser = async (shopId: string): Promise<any> => {
  const url = Config.User.SELF_URL;
  try {
    const result = await fetch(url, { method: "GET" });
    if (result.ok) {
      return result.json();
    }
  } catch (err) {
    console.log(err);
  }
};

const getCurrentDeliveries = async (): Promise<{
  success: boolean;
  data: any;
}> => {
  const url = Config.Delivery.ALLOPEN_URL;
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Token " + localStorage.getItem("TOKEN") },
    });
    let data;
    if (result.ok) {
      const body = await result.json();
      data = { success: true, data: body };
      return data;
    } else if (result.status === 401) {
      data = { success: false, data: "Unauthorized" };
    } else {
      const msg = await result.text();
      const jsonmsg = JSON.parse(msg);
      data = { success: false, data: jsonmsg.message };
    }
    return data;
  } catch (err) {
    return { success: false, data: err };
  }
};

const getAllDeliveries = async (): Promise<any> => {
  const url = Config.Delivery.ALL;
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

const createPin = async (): Promise<any> => {
  const url = Config.Auth.CREATE_PIN;
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
    {
      amount: number;
      id: string;
      depositTypeId?: string;
      depositName?: string;
      type?: string;
    }
  ]
): Promise<any> => {
  const url = Config.Deposit.RETURN;
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
      let text = "";
      returnedItems.forEach((item) => {
        text = text + item.amount + " x " + item.type + ". \n";
      });
      text = text + " wurden eingetragen.";
      return { message: "Erfolgreich eingetragen", text };
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

const updateDeliverySlot = async (
  id: string,
  deliverySlot: any
): Promise<ShopifyOrder | undefined> => {
  const url = Config.Delivery.UPDATESLOT;
  try {
    const result = await fetch(url + "/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify(deliverySlot),
    });
    const body = await result.json();

    return body;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const updateDeliverySlots = async (
  deliverySlotId: string,
  action: string
): Promise<any> => {
  const baseurl = Config.Delivery.SLOTADD + "/" + deliverySlotId;
  const end = action === "ADD" ? "/add" : "/remove";
  const url = baseurl + end;
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

const updateDeliveryStatus = async (
  id: string,
  status: "OPEN" | "PACKED" | "DELIVERED"
): Promise<any> => {
  const url = Config.Delivery.UPDATESTATUS;
  try {
    const result = await fetch(url + id + "/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ status }),
    });
    const body = await result.json();

    return body;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const apiObj = {
  updateDeliveryStatus,
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
  updateDeliverySlot,
  resetPW,
  requestPW,
  chekPWToken,
  createPin,
  updateShopifyOrder,
};
export default apiObj;
