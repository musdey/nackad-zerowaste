import React, { useContext, createContext, useState } from "react";
import api from "./api";

const useProvideAuth = (): AuthContextInterface => {
  const [user, setUser] = useState<User | undefined>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const signout = async (): Promise<void> => {
    setUser(undefined);
    setLoggedIn(false);
    localStorage.setItem("TOKEN", "");
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
          if (!data) {
            resolve({ success: false });
          }
          setUser(data);
          setLoggedIn(true);
          resolve({ success: true });
        })
        .catch((err) => {
          resolve({ success: false, error: err });
        });
    });
  };

  return {
    signin,
    signout,
    user,
    loggedIn,
    getUserWithToken,
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
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
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
}
