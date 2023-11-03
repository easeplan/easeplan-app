import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the access_token exists in the query
    if (!req.query.access_token) {
      res.status(400).json({ error: `No access token provided` });
      return;
    }

    if (!req.query.user_id) {
      res.status(400).json({ error: `No user id provided` });
      return;
    }
    // Set the cookie
    const accessTokenCookie = cookie.serialize(
      `accessToken`,
      String(req.query.access_token),
      {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: `strict`,
        path: `/`,
      },
    );

    const userIdCookie = cookie.serialize(`userId`, String(req.query.user_id), {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: `strict`,
      path: `/`,
    });

    // Set both cookies in the response
    res.setHeader(`Set-Cookie`, [accessTokenCookie, userIdCookie]);

    // Redirect
    res.redirect(`http://localhost:3000/account/onboard`);
  } catch (error) {
    res.status(500).json({ error: `An internal error occurred` });
  }
};

export default handler;
