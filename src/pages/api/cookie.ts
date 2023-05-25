import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    // Get the token from the cookie
    const token = req.cookies.token;

    // Return the token in the response
    res.status(200).json({ token });
  } else if (req.method === `POST`) {
    // Set the token in the cookie
    const { token } = req.body;

    res.setHeader(`Set-Cookie`, `token=${encodeURIComponent(token)}; HttpOnly`);

    res.status(200).end();
  } else if (req.method === `DELETE`) {
    // Clear the token from the cookie
    res.setHeader(`Set-Cookie`, `token=; HttpOnly; Max-Age=0`);

    res.status(200).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
