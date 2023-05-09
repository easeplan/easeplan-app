import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(`Required`),
  lastName: Yup.string().required(`Required`),
  email: Yup.string().email(`Invalid email`).required(`Required`),
  gender: Yup.string().required(`Required`),
});

const genders = [
  { label: `Male`, value: `male` },
  { label: `Female`, value: `female` },
  { label: `Other`, value: `other` },
];

const TextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ``;
  return (
    <TextField
      label={label}
      fullWidth
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const SelectInput = ({ label, options, ...props }: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ``;
  return (
    <FormControl fullWidth error={!!errorText}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} label={label}>
        {options &&
          options?.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
      <ErrorMessage name={field.name} component="div" />
    </FormControl>
  );
};

const RegistrationForm = () => {
  const initialValues: FormValues = {
    firstName: ``,
    lastName: ``,
    email: ``,
    gender: ``,
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          {/* <Field
            name="firstName"
            component={TextInput}
            label="First Name"
            variant="outlined"
            margin="normal"
          />
          <Field
            name="lastName"
            component={TextInput}
            label="Last Name"
            variant="outlined"
            margin="normal"
          /> */}
          <TextInput
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            placeHolder="Email Address"
          />
          {/* <Field
            name="gender"
            component={SelectInput}
            label="Gender"
            options={genders}
            variant="outlined"
            margin="normal"
          /> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // disabled={!dirty || !isValid}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
