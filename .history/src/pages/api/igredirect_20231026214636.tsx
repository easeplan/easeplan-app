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
    res.cookies.set({
      name: 'accessToken',
      value: req.query.access_token,
      httpOnly: true,
      maxAge: 60 * 60,
    })

    res.cookies.set({
      name: 'userId',
      value: req.query.user_id,
      httpOnly: true,
      maxAge: 60 * 60,
    })
    // Redirect
    res.redirect(`/account/onboard`);
  } catch (error) {
    res.status(500).json({ error: `An internal error occurred` });
  }
};

export default handler;
