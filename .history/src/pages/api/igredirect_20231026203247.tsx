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
    res.setHeader(
      `Set-Cookie`,
      cookie.serialize(`access_token`, String(req.query.access_token), {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`, // Only send the cookie over HTTPS if not in development
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: `strict`,
        path: `/`,
      }),
    );

    res.setHeader(
      `Set-Cookie`,
      cookie.serialize(`user_id`, String(req.query.user_id), {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV !== `development`, // Only send the cookie over HTTPS if not in development
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: `strict`,
        path: `/`,
      }),
    );

    // Redirect
    res.redirect(`/account/onboard`);
  } catch (error) {
    res.status(500).json({ error: `An internal error occurred` });
  }
};

export default handler;
