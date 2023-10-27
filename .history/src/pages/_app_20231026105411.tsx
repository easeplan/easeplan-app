import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import CssBaseline from '@mui/material/CssBaseline';
import posthog from 'posthog-js';
import * as gtag from '@/lib/gtag';
import theme from '@/styles/theme';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@/context/contextStore';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === `production`;

//  Create a client
const queryClient = new QueryClient();

useEffect(() => {
  const refreshToken = async () => {
    // Fetch a new token and update the state.
    // You might want to add error handling here too.
    const newToken = await fetch(`${NEXT_PUBLIC_API_URL}/ap`);
    setToken(newToken);
  };

  // Refresh the token every 50 minutes.
  const interval = setInterval(refreshToken, 50 * 60 * 1000);

  // Run once immediately at the start (optional).
  refreshToken();

  return () => clearInterval(interval); // Cleanup on component unmount.
}, []);
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    posthog.init(`${process.env.NEXT_PUBLIC_POSTHOG_INIT}`, {
      api_host: `https://app.posthog.com`,
      session_recording: {
        inlineStylesheet: false,
      },
    });
    posthog.capture(`my event`, { property: `value` });

    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on(`routeChangeComplete`, handleRouteChange);
    return () => {
      router.events.off(`routeChangeComplete`, handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>

      <GoogleOAuthProvider clientId="314971178164-o0q5ossjll2eo1tdthtlhncrv53o6ust.apps.googleusercontent.com">
        <Provider store={store}>
          <AnimatePresence mode={`wait`}>
            <AuthProvider queryData={pageProps.queryData}>
              <QueryClientProvider client={queryClient}>
                <ToastContainer position="top-center" />
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Component key={router.pathname} {...pageProps} />
                </ThemeProvider>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              </QueryClientProvider>
            </AuthProvider>
          </AnimatePresence>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}
