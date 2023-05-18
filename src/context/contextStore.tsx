/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, createContext, useContext } from 'react';

interface ContextType {
  intro: boolean;
  setIntro: React.Dispatch<React.SetStateAction<boolean>>;
  introOne: boolean;
  setIntroOne: React.Dispatch<React.SetStateAction<boolean>>;
  step1: boolean;
  setStep1: React.Dispatch<React.SetStateAction<boolean>>;
  step2: boolean;
  setStep2: React.Dispatch<React.SetStateAction<boolean>>;
  step3: boolean;
  setStep3: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<ContextType>({} as ContextType);

export const AuthProvider = ({ children }: any) => {
  const [intro, setIntro] = useState<boolean>(true);
  const [introOne, setIntroOne] = useState<boolean>(false);
  const [step1, setStep1] = useState<boolean>(false);
  const [step2, setStep2] = useState<boolean>(false);
  const [step3, setStep3] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        intro,
        setIntro,
        introOne,
        setIntroOne,
        step1,
        setStep1,
        step2,
        setStep2,
        step3,
        setStep3,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthContext);
