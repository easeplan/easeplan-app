import axios from 'axios';
import { parseCookies } from '@/lib/parseCookies';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: string }): void; new (): any };
    };
  },
) => {
  const { token } = parseCookies(req);

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/providers/profile`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  res.status(200).json(data);
};
