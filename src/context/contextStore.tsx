/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { parseCookies } from '@/lib/parseCookies';
import useFetch from '@/hooks/useFetch';

interface ContextType {
  queryData?: any;
  token: string;
  setQueryData?: any;
  // isLoading?: boolean;
  setIsLoading?: any;
  // error?: any;
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
  // step4: boolean;
  // setStep4: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function getServerSideProps({ req }: any) {
  const { token } = parseCookies(req);

  // console.log(token);

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: `/login`,
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      // queryData: data?.data?.serviceProvider,
      token: token,
    },
  };
}

const AuthContext = createContext<ContextType>({} as ContextType);

export const AuthProvider = ({ queryData, token, children }: any) => {
  const [intro, setIntro] = useState<boolean>(false);
  const [introOne, setIntroOne] = useState<boolean>(false);
  const [step1, setStep1] = useState<boolean>(false);
  const [step2, setStep2] = useState<boolean>(true);
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
        queryData,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthContext);
