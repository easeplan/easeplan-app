import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IUser } from 'types/interfaces/IUser';

export interface ReturnProps {
  provider: IUser;
  totalEvents: number;
  eventsInQueue: number;
  availableBalance: number;
  totalBalance: number;
}

// Define the shape of the context
interface AuthContextInterface {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  loginUser: (newToken: string) => void;
  logout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create a default value
const defaultContextValue: AuthContextInterface = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {}, // Placeholder function
  token: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {}, // Placeholder function
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loginUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoggedIn: () => {},
  isLogin: false,
};

// Create the context
export const AuthContext =
  createContext<AuthContextInterface>(defaultContextValue);

// Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setIsLoggedIn] = useState<boolean>(false);

  const loginUser = (newToken: string) => {
    setToken(newToken);
    // You can also set user details here if available
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loginUser,
        logout,
        isLogin,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export a custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
