import { createContext, useContext, useState } from 'react';

interface ContextType {
  queryData?: any;
  setQueryData?: any;
  isLoading?: boolean;
  setIsLoading?: any;
  error?: any;
}

const UserContext = createContext<ContextType>({} as ContextType);

export const UserProvider = ({ children }: any) => {
  const [queryData, setQueryData] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  return (
    <UserContext.Provider
      value={{
        queryData,
        setQueryData,
        isLoading,
        setIsLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
