import { validateUser } from "@/modules/fetch";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
};

type UserContextValue = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

type UserProviderProps = {
  children?: React.ReactNode;
};

const UserContext = createContext<UserContextValue | null>(null);
const STORAGE_KEY = "user-storage-key";

export const useUserContext = () => useContext(UserContext);

export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  useEffect(() => {
    validateUser()
      .then((res) => setUser(res.user))
      .catch((err) => {
        console.log(err);
        logout();
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
