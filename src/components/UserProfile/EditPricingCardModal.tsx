import { useState } from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

const style = {
  position: `absolute` as const,
  top: `40%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: {
    xs: `85%`,
    sm: `45%`,
    md: `40%`,
    lg: `30%`,
    xl: `30%`,
  },
  height: `auto`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderRadius: `8px`,
};

interface FormValues {
  items: string[];
}

const initialValues: FormValues = {
  items: [``],
};

const validationSchema = Yup.object().shape({
  items: Yup.array().of(Yup.string().required(`This field is required`)),
});

const EditPricingCardModal = ({ isOpen, isClose, token, queryData }: any) => {
  const [fieldCount, setFieldCount] = useState(1);

  const handleAddField = () => {
    setFieldCount(fieldCount + 1);
  };

  const handleRemoveField = (index: number) => {
    if (fieldCount > 1) {
      setFieldCount(fieldCount - 1);
    }
  };

  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials) =>
      customFetch.post(`/providers/profile`, credentials, {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Profile updated`);
      isClose(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const updateProfileImg = async (credentials: any) => {
    updateProfile(credentials);
  };
  return (
    <Container fixed>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm">
          <Box sx={style}>
            <Box
              sx={{
                py: {
                  xs: 3,
                  lg: 4,
                },
                px: {
                  xs: 3,
                  lg: 4,
                },
              }}
            >
              <Typography mb={4}>Edit Profile</Typography>
              <Box>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={console.log}
                >
                  {({ values }) => (
                    <Form>
                      <FieldArray name="items">
                        {({ push, remove }) => (
                          <>
                            {values.items.map((_, index) => (
                              <div key={index}>
                                <Field name={`items[${index}]`} />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveField(index)}
                                >
                                  Remove
                                </button>
                                <ErrorMessage name={`items[${index}]`} />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleAddField()}
                            >
                              Add Field
                            </button>
                          </>
                        )}
                      </FieldArray>
                      <button type="submit">Submit</button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
};

export default EditPricingCardModal;
