import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';

// A helper function to send error responses
function sendErrorResponse(res: NextApiResponse, error: any) {
  const status = error.response?.status || 500;
  const message = error.response?.data?.message || 'Unexpected Error occured';
  res.status(status).json({ message });
}

// A helper function to set a cookie
function setTokenCookie(res: NextApiResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 1, // 1 day
      sameSite: 'strict',
      path: '/',
    }),
  );
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      req.body,
    );

    if (!data || !data.token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    setTokenCookie(res, data.token);

    res.status(200).json(data);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export default handler;
