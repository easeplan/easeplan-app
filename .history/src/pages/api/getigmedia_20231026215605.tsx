import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const access_token = cookies.access_token;
  const user_id = cookies.userId;
  console.log(access_token, user_id, cookies )
  if (!access_token || !user_id) {
    return res
      .status(401)
      .json({ error: 'Unauthorized. Missing Instagram data in cookies.' });
  }

  const endpoint = `https://graph.instagram.com/23964241119890640/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&access_token=IGQWRPeFlWVVpFUUd4WnNteFl1NGxRTm9kWnBfVEF6S1lURWFJcE44bEl4bFg2bDdJMHVidDlNTEF1XzlFb05wd0FieE9faV95ajB2dEdxTmlOQ0wxUFpfNUpiQll0ZAE85em1OQ2JyeGhWbXhpdnJJazQzOFlWMFA0RVhiRXVCZA1FfdwZDZD`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Instagram API responded with status ${response.status}`);
    }

    const responseData = await response.json();

    return res.json(responseData);
  } catch (error: any) {
    return res.status(500).json({
      error: 'Failed to fetch Instagram media',
      details: error.message,
    });
  }
};

export default handler;
