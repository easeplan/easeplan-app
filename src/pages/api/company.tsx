import axios from 'axios';
import { parseCookies } from '@/lib/parseCookies';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const { token } = parseCookies(req);

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/providers/verification/company`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  res.status(200).json(data);
};
