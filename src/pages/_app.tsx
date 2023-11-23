import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import posthog from 'posthog-js';
import axios from 'axios';

import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as gtag from '@/lib/gtag';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import theme from '@/styles/theme';
import { RootState, store } from '../store/store';
import { AuthProvider, useAuth } from '@/hooks/authContext';
import { setCredentials, clearCredentials } from '@/features/authSlice';
import { SocketProvider } from '@/hooks/useSocketContext';
import Head from 'next/head';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Posthog and Route Change Effect
  useEffect(() => {
    // Posthog Initialization
    posthog.init(`${process.env.NEXT_PUBLIC_POSTHOG_INIT}`, {
      api_host: 'https://app.posthog.com',
      session_recording: { inlineStylesheet: false },
    });

    // Event Capturing
    const urlParams = new URLSearchParams(window.location.search);
    const referedBy = urlParams.get('referedBy');
    if (referedBy) {
      posthog.capture('referral-landing', {
        distinct_id: posthog.get_distinct_id(),
        referedBy: referedBy,
      });
      localStorage.setItem('referedBy', referedBy);
    }

    // Route Change Handling
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string}
      >
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <AuthProvider>
                <SocketProvider>
                  <CssBaseline />
                  <ToastContainer position="top-center" />
                  <AnimatePresence mode={'wait'}>
                    <Component key={router.pathname} {...pageProps} />
                  </AnimatePresence>
                </SocketProvider>
              </AuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}
