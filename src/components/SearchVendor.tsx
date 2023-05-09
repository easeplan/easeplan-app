import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import CustomButton from './common/CustomButton';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import FormInput from './common/FormInput';
import Label from './common/Label';
import theme from '@/styles/theme';
import coverImg from '@/public/serviceImg.png';
import SuggestedVendorCard from './SuggestedVendorCard';

const serviceData = [
  {
    id: 1,
    service: `DJ`,
    budget: `100,000.00`,
    location: `Port Harcourt`,
    ratings: 4,
    numEvent: 46,
    isRejected: false,
    isAccepted: false,
    img: coverImg,
  },
  {
    id: 2,
    service: `DJ`,
    budget: `100,000.00`,
    location: `Port Harcourt`,
    ratings: 4,
    numEvent: 46,
    isRejected: false,
    isAccepted: false,
    img: coverImg,
  },
  {
    id: 3,
    service: `DJ`,
    budget: `100,000.00`,
    location: `Port Harcourt`,
    ratings: 4,
    numEvent: 46,
    isRejected: false,
    isAccepted: false,
    img: coverImg,
  },
  {
    id: 4,
    service: `DJ`,
    budget: `100,000.00`,
    location: `Port Harcourt`,
    ratings: 4,
    numEvent: 46,
    isRejected: false,
    isAccepted: false,
    img: coverImg,
  },
];

const validationSchema = Yup.object().shape({
  service: Yup.string(),
  amount: Yup.string(),
});

const SearchVendor = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Box sx={{ border: `solid 1px ${theme.palette.primary.main}` }}>
      <Typography p={2} variant="h6" color="primary.main">
        Vendor Search
      </Typography>
      <Box mb={2}>
        <Formik
          initialValues={{ service: ``, amount: `` }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Box
                px={3}
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                  flexDirection: {
                    xs: `column`,
                    sm: `column`,
                    md: `column`,
                    lg: `row`,
                    xl: `row`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: `100%`,
                    display: `grid`,
                    gap: {
                      xs: `0rem`,
                      sm: `0rem`,
                      md: `1rem`,
                      lg: `2rem`,
                      xl: `2rem`,
                    },
                    gridTemplateColumns: {
                      xs: `repeat(1, 1fr)`,
                      sm: `repeat(1, 1fr)`,
                      md: `repeat(2, 1fr)`,
                      lg: `repeat(2, 1fr)`,
                      xl: `repeat(2, 1fr)`,
                    },
                  }}
                >
                  <Box>
                    <Label text="Service" />
                    <FormInput name="service" placeholder="e.g DJ" />
                  </Box>
                  <Box>
                    <Label text="Amount" />
                    <FormInput name="amount" placeholder="e.g ₦1000.00" />
                  </Box>
                </Box>
                <CustomButton bgPrimary>Send Message</CustomButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Divider />
      <Box p={3}>
        <Typography variant="h6" color="primary.main">
          Suggested vendors
        </Typography>
        <Typography>
          This are vendors suggested for you for to carry out this event, they
          can be changed if they don&apos;t fall within the budget or without
          response after 30min of being contacted.
        </Typography>
        <Box mt={4}>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {serviceData.map((data) => (
              <Grid key={data.id} item xs={12} sm={12} md={6}>
                <SuggestedVendorCard data={data} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchVendor;
