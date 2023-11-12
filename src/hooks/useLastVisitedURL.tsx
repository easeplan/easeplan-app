import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useLastVisitedURL() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastVisitedURL', url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    typeof window !== 'undefined' && localStorage.getItem('lastVisitedURL')
  );
}
