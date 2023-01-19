import React, { useContext, createContext, useState } from "react";
import api from "./api";
import { useHistory } from "react-router";

const useProvideAuth = (): AuthContextInterface => {
  const [user, setUser] = useState<User | undefined>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const history = useHistory();


  const updateUserSMSMethod = async (cloudSMS: boolean): Promise<{ success: boolean; error?: Error }> => {
    return new Promise(async (resolve, reject) => {

      if (user) {
        const userToUpdate = user
        userToUpdate.cloudSMS = cloudSMS

        api.updateUser(userToUpdate).then(() => {
          setUser(userToUpdate)
          resolve({ success: true });
        }).catch((err) => {
          resolve({ success: false, error: err });
        });

      } else {
        resolve({ success: false, error: new Error("undefined error") })
      }
    })
  }

  const signout = async (): Promise<void> => {
    setLoggedIn(false);
    setUser(undefined);
    localStorage.setItem("TOKEN", "");
    history.push("/login");
  };

  const signin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: Error }> => {
    return new Promise(async (resolve, reject) => {
      await api
        .signin(email, password)
        .then(async (data) => {
          localStorage.setItem("TOKEN", data.accessToken);
          setUser(data);
          setLoggedIn(true);
          resolve({ success: true });
        })
        .catch((err) => {
          resolve({ success: false, error: err });
        });
    });
  };

  const getUserWithToken = async (): Promise<{
    success: boolean;
    error?: Error;
  }> => {
    return new Promise(async (resolve, reject) => {
      await api
        .getUserData()
        .then(async (data) => {
          console.log(data);
          if (!data.success) {
            return resolve(data);
          }
          setUser(data.data);
          setLoggedIn(true);
          resolve(data);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  };

  return {
    signin,
    signout,
    user,
    loggedIn,
    getUserWithToken,
    updateUserSMSMethod
  };
};
const AuthContext = createContext({} as AuthContextInterface);

export function ProvideAuth({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const auth = useProvideAuth();
  return React.createElement(AuthContext.Provider, { value: auth }, children);
}

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

export type User = {
  firstName: string;
  mainShop: {
    name: string
  };
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  cloudSMS: boolean;
  _id: string;
  role: {
    name: string;
  };
};

interface AuthContextInterface {
  signout: () => Promise<void>;
  signin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: Error }>;
  getUserWithToken: () => Promise<{ success: boolean; error?: Error }>;
  user?: User;
  loggedIn: boolean;
  updateUserSMSMethod: (cloudSMS: boolean) => Promise<{ success: boolean; error?: Error }>;
}
