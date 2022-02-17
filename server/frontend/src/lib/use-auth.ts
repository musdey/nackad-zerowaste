import React, { useContext, createContext, useState } from "react";
import api from "./api";

const useProvideAuth = (): AuthContextInterface => {
  const [user, setUser] = useState<User>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const signout = async (): Promise<void> => {
    setUser(undefined);
    setLoggedIn(false);
    localStorage.setItem("TOKEN", "");
  };

  const signin = async (email: string, password: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      await api
        .signin(email, password)
        .then(async (data) => {
          localStorage.setItem("TOKEN", data.accessToken);
          console.log(data);
          setUser(data);
          setLoggedIn(true);
          resolve(true);
        })
        .catch((err) => {
          resolve(false);
        });
    });
  };

  return {
    signin,
    signout,
    user,
    loggedIn,
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

type User = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  userId: string;
};

interface AuthContextInterface {
  signout: () => Promise<void>;
  signin: (email: string, password: string) => Promise<boolean>;
  user?: User;
  loggedIn: boolean;
}
