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

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === `production`;

//  Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // posthog.init(`${process.env.NEXT_PUBLIC_POSTHOG_INIT}`, {
    //   api_host: `https://app.posthog.com`,
    //   session_recording: {
    //     inlineStylesheet: false,
    //   },
    // });
    // posthog.capture(`my event`, { property: `value` });

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
  );
}
