import React, { useState } from 'react';
import Dojah from 'react-dojah';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useAuth } from '@/hooks/authContext';

const VerifiactionFlow = ({ setIsVerified }: any) => {
  const { user } = useAuth();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const type = 'custom';

  const config = {
    debug: true,
    widget_id: `${process.env.NEXT_PUBLIC_VERIFICATION_WIDGETID}`,
    webhook: true, //Before you set webhook to true, Ensure you are subscribed to the webhook here https://api-docs.dojah.io/docs/subscribe-to-services
  };

  /**
   *  These are the metadata options
   *  You can pass any values within the object
   */
  const metadata = {
    user_id: user?._id,
  };

  /**
   * @param {String} type
   * This method receives the type
   * The type can only be one of:
   * loading, begin, success, error, close
   * @param {String} data
   * This is the data from doja
   */
  const response = (type: string, data: string) => {
    if (type === 'success') {
      setIsVerified(true);
    } else if (type === 'error') {
    } else if (type === 'close') {
    } else if (type === 'begin') {
    } else if (type === 'loading') {
    }
  };

  return (
    <Box sx={{ width: '40%', margin: '0 auto' }}>
      <Dojah
        response={response}
        appID={process.env.NEXT_PUBLIC_VERIFICATION_APPID}
        publicKey={process.env.NEXT_PUBLIC_VERIFICATION_PUBLICKEY}
        config={config}
        metadata={metadata}
        type={type}
      />
    </Box>
  );
};

export default VerifiactionFlow;
