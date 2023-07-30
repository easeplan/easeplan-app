import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import cahtImg from '@/public/avatar.png';
import Image from 'next/image';

const SenderMessage = ({ message, userInfo }: any) => {
  // console.log(message);
  return (
    <>
      {
        <Box
          sx={{
            display: `flex`,
            justifyContent: `${
              message.from?._id === userInfo?._id ? `start` : `end`
            }`,
            alignItems: `${
              message.from?._id === userInfo?._id ? `start` : `end`
            }`,
          }}
        >
          <Box
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              cursor: `pointer`,
              transition: `all 0.5s ease`,
              p: `1rem`,
              mb: `2rem`,
              width: `60%`,
            }}
          >
            <Box sx={{ width: `90%`, textAlign: `right` }}>
              <Typography
                fontWeight="bold"
                fontSize="0.8rem"
                color="primary.main"
              >
                {message?.to?.profile?.firstName}
                {` `}
                {message?.to?.profile?.lastName}
              </Typography>
              <Typography
                fontSize="0.8rem"
                sx={{
                  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                  background: `#fff`,
                  p: 2,
                  borderRadius: `8px`,
                  mt: 1,
                  textAlign: `left`,
                }}
                color="primary.main"
              >
                {message?.message}
              </Typography>
              {/* <Box
            sx={{
              position: `relative`,
              mt: `1rem`,
              width: `100%`,
              height: `100px`,
              background: theme.palette.primary.main,
            }}
          >
            <Image src={cahtImg} alt="profileImg" fill />
          </Box> */}
            </Box>
            <Box
              sx={{
                position: `relative`,
                width: `40px`,
                height: `40px`,
                borderRadius: `50%`,
                backgroundColor: `secondary.main`,
                marginLeft: `1rem`,
              }}
            >
              <Image
                src={
                  message?.to?.profile?.picture
                    ? message?.to?.profile?.picture
                    : cahtImg
                }
                alt="profileImg"
                fill
                style={{
                  borderRadius: `50%`,
                }}
              />
            </Box>
          </Box>
        </Box>
      }
    </>
  );
};

export default SenderMessage;
