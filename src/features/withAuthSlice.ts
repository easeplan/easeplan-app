import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Define a generic type for your component's props if necessary
type ComponentProps = Record<string, unknown>;

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: ComponentProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      // Since localStorage is not accessible on server side, you need to ensure this code runs client-side
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login'); // Redirect to login if not authenticated
        } else {
          setIsLoading(false); // Token is found, stop showing loading
        }
      }
    }, [router]);

    // If still loading, show a spinner or a loading message
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Otherwise, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  // Set a display name for the wrapped component for easier debugging
  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return AuthComponent;
};

export default withAuth;
