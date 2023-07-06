import { useState } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Box, MenuItem, Button, Typography } from '@mui/material';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import Image from 'next/image';
import logoImg from '@/public/logo.png';
import IllusImg from '@/public/onboarding-image/Feeling proud-bro.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIntro, setIntroOne, setIntroTwo } from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import theme from '@/styles/theme';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import customFetch from '@/utils/customFetch';

interface TextAreaProps {
  rows?: number;
  name: string;
  placeholder?: string;
  sx: any;
}

const TextArea = ({ rows = 10, ...props }: TextAreaProps) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <textarea
        style={{
          width: `100%`,
          padding: `1rem`,
          border: `none`,
          resize: `none`,
          overflowY: `auto`,
          fontSize: `1rem`,
          outline: `none`,
          background: `transparent`,
        }}
        {...field}
        {...props}
        rows={rows}
      />
    </div>
  );
};

// Form Input Schema
const ReviewFormSchema = Yup.object().shape({
  review: Yup.string().required(`Review Message is required`),
});

interface PropsTypes {
  token: string;
  rating: string;
  profileId: string;
  role: string;
}

interface FormTypes {
  review?: any;
}

const ReviewForm = ({ token, rating, profileId, role }: PropsTypes) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const { mutate: updateReview, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.post(`/ratings`, credentials, {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Profile updated`);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleFormSubmit = async (credentials: FormTypes) => {
    const data = {
      stars: rating,
      role: role,
      profileId: profileId,
      review: credentials.review,
    };
    updateReview(data);
  };

  return (
    <Box sx={{ display: `flex` }}>
      {/* Form */}
      <Box
        sx={{
          border: `solid 1px #ccc`,
          width: `100%`,
          mt: 8,
        }}
      >
        <Box sx={{ p: 2, borderBottom: `solid 1px #cccc` }}>
          <Typography>Send message</Typography>
        </Box>
        <Formik
          initialValues={{
            review: ``,
          }}
          onSubmit={(values) => handleFormSubmit(values)}
          validationSchema={ReviewFormSchema}
        >
          {({}) => (
            <Form>
              <Box>
                <TextArea
                  placeholder="Type Message Here!"
                  name="review"
                  sx={{ border: `none` }}
                  rows={6}
                />
              </Box>
              <Box
                sx={{ textAlign: `right`, p: 2, borderTop: `solid 1px #ccc` }}
              >
                <Button
                  color="primary"
                  style={{ color: theme.palette.secondary.main }}
                  variant="contained"
                  type="submit"
                >
                  Send Message
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ReviewForm;
