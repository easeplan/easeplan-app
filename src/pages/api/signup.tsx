import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body);
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      req.body,
    );
    if (!data) {
      res.status(401).json({ error: `Invalid credentials` });
      return;
    }

    const token = data?.data?.accessToken;
    // console.log(token);

    res.setHeader(
      `Set-Cookie`,
      cookie.serialize(`token`, token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: `strict`,
        path: `/`,
      }),
    );

    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: `Invalid credentials` });
  }
};

export default handler;
