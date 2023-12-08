import { useState, useEffect } from 'react';

export function useFetchVendors(
  page: unknown,
  search?: unknown,
  currentState?: any,
  currentCity?: any,
  budget?: any,
  service?: string,
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Assuming you're fetching data from an API
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profiles?page=${page}&state=${currentState}&city=${currentCity}&budget=${budget}&service=${service}&searchTerm=${search}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [budget, currentCity, currentState, page, search, service]); // The effect will re-run if userId changes

  return { data, loading, error };
}
