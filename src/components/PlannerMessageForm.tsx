import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import theme from '@/styles/theme';
import CustomButton from './common/CustomButton';
import TextArea from './common/TextArea';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  message: Yup.string(),
});

const PlannerMessageForm = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Box sx={{ border: `solid 1px ${theme.palette.primary.main}` }}>
      <Box>
        <Typography p={2}>Send inbox message to planner</Typography>
      </Box>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <TextArea rows={4} name="message" />
            <Box p={2} textAlign="right">
              <CustomButton bgPrimary>Send Message</CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PlannerMessageForm;
