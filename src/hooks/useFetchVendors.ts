import { useState, useEffect } from 'react';

// interface VendorData  {
//   _id: string;
//   userId: string;
//   publicId: string;
//   state: string;
//   city: string;
//   business: string;
//   identityVerify?: string;
//   introVideo?: string;
//   verified: boolean;
//   dob: string;
//   gender: string;
//   company: string;
//   samples: [
//     {
//       _id?: string;
//       image: string;
//       title: string;
//       description: string;
//     },
//   ];
//   budget: {
//     maximum: number;
//     minimum: number;
//   };
//   ratings: [];
//   rating: number;
//   selections: [
//     {
//       date: Date;
//       count: number;
//     },
//   ];
//   createdAt: Date;
//   events: Map<
//     string,
//     {
//       status: string;
//       bookedOn: string | null;
//       declined: boolean;
//       declinedReason?: string | null;
//       cancelReason?: string | null;
//       currentJob: string | null;
//     }
//   >;
//   balance: number;
//   role: string;
//   clients: string[];
//   responseTimes: number[];
//   currentlyHiredBy: string[];
//   currentlyRequestedBy: string[];
//   averageResponseTime: number;
//   availbalance: number;
//   approved: boolean;
//   registered: boolean;
// };

// interface ApiResponse {
//   status: string;
//   data: {
//     data: VendorData[];
//   };
//   totalPages: number
// }

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
          throw new Error(`Network response was not ok`);
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
  }, [page, search, service]); // The effect will re-run if userId changes

  return { data, loading, error };
}
