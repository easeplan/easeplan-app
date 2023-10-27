import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch(
      `http://easeplan-env-1.eba-3mynfvmg.us-east-1.elasticbeanstalk.com/api/v2/auth/verify_google`,
      {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({ token: req.body.token }),
      },
    );

    const data = await result.json();
    res.setHeader(
      `Set-Cookie`,
      cookie.serialize(`token`, data.token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
        maxAge: 60 * 60 * 24 * 1, // 1 day
        sameSite: `strict`,
        path: `/`,
      }),
    );
    res.status(200).json(data);
  } catch (error) {
    return error;
  }
};

export default handler;