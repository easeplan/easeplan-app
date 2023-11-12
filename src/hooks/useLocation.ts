import { useState, useEffect } from 'react';
import axios from 'axios';

function useLocation() {
  const [location, setLocation] = useState({
    currentState: null,
    currentCity: null,
    error: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // This uses OpenStreetMap's Nominatim service for geocoding, but you might want to replace it with another service.
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
          );

          const { address } = response.data;
          console.log(address);
          setLocation({
            currentState: address.state,
            currentCity: address.city || address.town || address.village, // Some places might not have 'city' but might have 'town' or 'village'
            error: null,
          });
        } catch (error) {
          setLocation((prev: any) => ({
            ...prev,
            error: 'Unable to fetch location details',
          }));
        }
      },
      (error) => {
        setLocation({
          currentState: null,
          currentCity: null,
          error: null,
        });
      },
    );
  }, []);

  return location;
}

export default useLocation;
