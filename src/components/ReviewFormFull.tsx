import { useState } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Box, MenuItem, Button, Typography, Rating } from '@mui/material';
// import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
// import Image from 'next/image';
// import logoImg from '@/public/logo.png';
// import IllusImg from '@/public/onboarding-image/Feeling proud-bro.svg';
import { useDispatch, useSelector } from 'react-redux';
// import { setIntro, setIntroOne, setIntroTwo } from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import theme from '@/styles/theme';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import customFetch from '@/utils/customFetch';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import CustomButton from './common/CustomButton';

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
  contractId: string;
  userId: string;
  submitReview: any;
  isLoadingData: boolean;
}

interface FormTypes {
  review?: any;
}

const ReviewFormFull = ({
  token,
  userId,
  contractId,
  submitReview,
  isLoadingData,
}: PropsTypes) => {
  const [hover, setHover] = React.useState(-1);
  const [$rating, setRating] = React.useState(0);
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
      toast.success(`Thank you for your feedback.`);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const labels: { [index: string]: string } = {
    1: `1`,
    2: `2`,
    3: `3`,
    4: `4`,
    5: `5`,
  };

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? `s` : ``}, ${labels[value]}`;
  }

  const handleFormSubmit = async (credentials: FormTypes) => {
    const data = {
      stars: $rating,
      userId,
      review: credentials.review,
      contractId,
    };
    updateReview(data);
  };

  // const handleRating = async (value: any) => {
  //   const data = {
  //     stars: value,
  //     role: role,
  //     profileId: profileId,
  //   };
  //   updateRating(data);
  // };

  return (
    <Box sx={{ display: `flex` }}>
      {/* Form */}
      <Box
        sx={{
          width: `100%`,
          mt: 8,
        }}
      >
        <div className="ea-center">
          <div>
            <h3 className="ea-heading-2">Rate Your Vendor</h3>
            <Rating
              name="hover-feedback"
              size={`large`}
              value={$rating}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => setRating(newValue || 0)}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </div>
        </div>
        <Box sx={{ p: 2, border: `solid 1px #cccc` }}>
          <p>Write your comments</p>
        </Box>
        <Formik
          initialValues={{
            review: ``,
          }}
          //validationSchema={ReviewFormSchema}
          onSubmit={(values, { resetForm }) => {
            const data = {
              stars: $rating,
              userId,
              review: values.review,
              contractId,
            };
            submitReview(data);
            resetForm();
          }}
        >
          {({}) => (
            <Form>
              <Box sx={{ p: 2, border: `solid 1px #cccc`, borderTop: `0px` }}>
                <TextArea
                  placeholder="Type Message Here!"
                  name="review"
                  sx={{ border: `none` }}
                  rows={6}
                />
              </Box>
              <Box sx={{ textAlign: `right`, p: 2, mt: 4 }}>
                <CustomButton
                  bgPrimary
                  smWidth="70%"
                  mdWidth="40%"
                  lgWidth="40%"
                  type="submit"
                  className="changeBtn"
                  loading={isLoadingData}
                  loadingText="Submiting..."
                >
                  Submit Review
                </CustomButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ReviewFormFull;
