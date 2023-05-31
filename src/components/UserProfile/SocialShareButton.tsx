import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';
import { BsTwitter, BsLinkedin, BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { Box } from '@mui/material';

const SocialShareButton = ({ message, url, toggleIcon }: any) => {
  const shareMessage = `Check out this awesome post: ${message}`;

  return (
    <Box className={toggleIcon ? `show-links` : `button-links`}>
      <TwitterShareButton url={url} title={shareMessage}>
        <BsTwitter className="icon" />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={shareMessage}>
        <BsLinkedin className="icon" />
      </LinkedinShareButton>
      <FacebookShareButton url={url} quote={shareMessage}>
        <BsFacebook className="icon" />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={shareMessage}>
        <BsWhatsapp className="icon" />
      </WhatsappShareButton>
    </Box>
  );
};

export default SocialShareButton;
