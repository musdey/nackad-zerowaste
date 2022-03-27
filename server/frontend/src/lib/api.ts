import Config from "../Config";

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

const updateDeposit = async (
  depositId: string,
  deliveryId: string,
  returnedItems: [{ amount: number; id: string }]
): Promise<any> => {
  const url = Config.Deposit.UPDATE;
  //const url = `${protocol + host + port}/api/v1/user/${shopId}`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("TOKEN"),
      },
      body: JSON.stringify({ depositId, deliveryId, returnedItems }),
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
  updateDeposit,
  getStatistics,
};
export default apiObj;
