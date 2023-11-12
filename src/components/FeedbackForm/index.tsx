/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import CustomButton from '../common/CustomButton';
import TextArea from '../common/TextArea';
import FormSuccess from '../common/FormSuccess';
import FormError from '../common/FormError';
import SuccessModal from '../common/SuccessModal';
import ErrorModal from '../common/ErrorModal';

// Form Input Schema
const FeedbackSchema = Yup.object().shape({
  content: Yup.string().required('Message is required'),
});

interface PropsTypes {
  token: string;
}

interface FormTypes {
  content?: string;
}

const FeedbackForm = ({ token }: PropsTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<any>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<any>(false);
  const [isErrorMessage, setIsErrorMessage] = useState<any>();

  const handleFormSubmit = async (credentials: FormTypes) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/feedbacks`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.status === 'success') {
        setIsSuccessMessage(data.status);
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorMessage(error);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={isSuccess}
        isClose={() => setIsSuccess(false)}
        title="Send successfully"
        message="Thank your the feedback"
      />
      <ErrorModal
        isOpen={isError}
        isClose={() => setIsError(false)}
        title="Fail to send"
        message="Something went wrong"
      >
        <CustomButton onClick={() => setIsError(false)} bgPrimary>
          Try Again
        </CustomButton>
      </ErrorModal>

      <Box sx={{ display: 'flex' }} mt={10}>
        <Box
          sx={{ width: '100%' }}
          px={3}
          py={3}
          component={motion.section}
          {...headContainerAnimation}
        >
          <Box
            sx={{
              width: {
                xs: '90%',
                sm: '80%',
                md: '60%',
                lg: '40%',
                xl: '40%',
              },
              margin: '0 auto',
            }}
          >
            <Typography
              component={motion.h5}
              {...headTextAnimation}
              mt={4}
              fontWeight={800}
              variant="h4"
              color="primary.main"
            >
              Give feedback
            </Typography>
            <Typography color="primary.main" fontSize="1.1rem" my={2}>
              Your thoughts are valuable in helping <br /> improve our products
            </Typography>

            {/* Form */}
            <Box mt={2} mb={10}>
              <Formik
                initialValues={{
                  content: '',
                }}
                onSubmit={(values) => handleFormSubmit(values)}
                validationSchema={FeedbackSchema}
              >
                {() => (
                  <Form>
                    {isSuccess && <FormSuccess text={isSuccess} />}
                    {isError && <FormError text={isError} />}
                    <Box>
                      <TextArea
                        name="content"
                        rows={6}
                        placeholder="Let us know what's on your mind"
                      />
                    </Box>

                    <Box mt={4}>
                      <CustomButton
                        type="submit"
                        lgWidth="100%"
                        bgPrimary
                        loading={isLoading}
                        loadingText="Sending feedback..."
                      >
                        Send feedback
                      </CustomButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FeedbackForm;
