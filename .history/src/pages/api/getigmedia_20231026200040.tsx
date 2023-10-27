import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {access_token, user_id} = req.cookies.token
  if (!access_token || !user_id) {
    return res
      .status(401)
      .json({ error: 'Unauthorized. Missing Instagram data in cookies.' });
  }

  const endpoint = `https://graph.instagram.com/${user_id}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&access_token=${access_token}`;

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
