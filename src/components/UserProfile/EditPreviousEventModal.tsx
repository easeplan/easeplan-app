import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import FormInput from '../common/FormInput';
import { styled } from '@mui/material/styles';
import Label from '../common/Label';
import CustomButton from '../common/CustomButton';
import TextArea from '../common/TextArea';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import DragAndDropInput from '../common/DragAndDropInput';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '85%',
    sm: '45%',
    md: '40%',
    lg: '30%',
    xl: '30%',
  },
  height: 'auto',
  bgcolor: '#fff',
  border: 'none',
  boxShadow: 24,
  borderRadius: '8px',
};

const CompanyProfileSchema = Yup.object().shape({
  editeventImage: Yup.string().required('Image is missing'),
});

const EditPreviousEventModal = ({
  isOpen,
  isClose,
  token,
  queryData,
  eventId,
}: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const { mutate: handleUpdate, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.put(
        `profiles/${userInfo}/edit-sample/${eventId}`,
        credentials,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('Event Updated');
      isClose(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleEventSubmit = async (credentials: any) => {
    const formData = new FormData();
    formData.append('sampleImage', credentials.editeventImage);
    const data = {
      sampleImage: credentials.editeventImage,
    };
    handleUpdate(data);
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
              <Typography mb={4} fontWeight={600} color="primary.main">
                Add Previous Event
              </Typography>
              <Box>
                <Formik
                  initialValues={{
                    editeventImage: '',
                  }}
                  onSubmit={(values) => handleEventSubmit(values)}
                  validationSchema={CompanyProfileSchema}
                >
                  {({}) => (
                    <Form>
                      <Box>
                        <Box mt={2}>
                          <Label text="Event Cover Image" />
                          <DragAndDropInput type="file" name="editeventImage" />
                        </Box>
                        <Box
                          mt={2}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <CustomButton
                            bgPrimary
                            smWidth="auto"
                            mdWidth="auto"
                            type="submit"
                            className="changeBtn"
                          >
                            {isLoading ? (
                              <FontAwesomeIcon icon={faCircleNotch} spin />
                            ) : (
                              'Save'
                            )}
                          </CustomButton>
                          <Typography
                            sx={{
                              cursor: 'pointer',
                              textAlign: 'center',
                            }}
                            onClick={isClose}
                          >
                            Cancel
                          </Typography>
                        </Box>
                      </Box>
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

export default EditPreviousEventModal;
