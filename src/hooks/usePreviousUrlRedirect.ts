import { useEffect } from 'react';
import { useRouter } from 'next/router';

const usePreviousUrlRedirect = (): ((newUrl: any) => void) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Store the current URL in the localStorage storage
      localStorage.setItem('previousUrl', url);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const redirectToPreviousUrl = (newUrl: any) => {
    const previousUrl = localStorage.getItem('previousUrl');
    if (previousUrl) {
      router.push(previousUrl);
    } else {
      // If no previous URL is stored, redirect to the homepage
      router.push(`/${newUrl}`);
    }
  };

  return redirectToPreviousUrl;
};

export default usePreviousUrlRedirect;
