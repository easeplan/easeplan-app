import React, { createContext, useState, useContext } from 'react';
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
  user: ReturnProps | null;
  setUser: React.Dispatch<React.SetStateAction<ReturnProps | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a default value
const defaultContextValue: AuthContextInterface = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {}, // Placeholder function
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoggedIn: () => {},
};

// Create the context
export const AuthContext =
  createContext<AuthContextInterface>(defaultContextValue);

// Export a custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
