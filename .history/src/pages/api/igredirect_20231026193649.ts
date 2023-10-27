import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader(
      `Set-Cookie`,
      cookie.serialize(`access_token`, req.query.access_token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
        maxAge: 60 * 60 * 24 * 1, // 1 day
        sameSite: `strict`,
        path: `/`,
      }),
    );
    res.redi;
  } catch (error) {
    return error;
  }
};

export default handler;