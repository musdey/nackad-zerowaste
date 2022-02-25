import Config from "../Config";

const getUserData = async () => {
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

    return { status: result.status, body: body };
  } catch (err) {
    console.log(err);
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
  if (result.ok) {
    return await result.json();
  } else {
    throw new Error("Unauthorized");
  }
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
  }
};
const apiObj = { signin, signup, getUser, getUserData, getCurrentDeliveries };
export default apiObj;
