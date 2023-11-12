import { Box, Typography, MenuItem, Alert } from '@mui/material';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import FormInput from '../common/FormInput';
import Label from '../common/Label';
import CustomButton from '../common/CustomButton';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { setOpenSearchModal } from '@/features/searchResultSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as const,
  bottom: '-1%',
  left: {
    xs: '0%',
    sm: '0%',
    md: '10%',
    lg: '10%',
    xl: '10%',
  },
  // transform: `translate(-50%, -50%)`,
  width: {
    xs: '100%',
    sm: '100%',
    md: '50%',
    lg: '35%',
    xl: '35%',
  },
  height: 'auto',
  bgcolor: '#fff',
  border: 'none',
  boxShadow: 24,
  borderTopRightRadius: '1rem',
  borderTopLeftRadius: '1rem',
};

const FormSchema = Yup.object().shape({
  budget: Yup.string().required('Budget is missing'),
  dateTime: Yup.string().required('Date is missing'),
  service: Yup.string().required('Service is missing'),
});

const CreateContractModal = ({ isOpen, isClose, token, queryData }: any) => {
  const router = useRouter();
  const { errorMsg } = useSelector((state: RootState) => state.searchModal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleSubmit = async (credentials: any) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/create-offer`,
        {
          budget: credentials.budget,
          dateTime: credentials.dateTime,
          profileId: queryData?._id,
          city: queryData?.providerProfile?.city,
          state: queryData.providerProfile?.state,
          service: credentials.service,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push(`/user/events/${data?.data?._id}`);
      toast.success('Successfully');
    } catch (error: any) {
      toast.success(error?.response?.data?.message);
      setIsLoading(false);
    }
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
                p: 2,
                backgroundColor: 'primary.main',
                borderTopRightRadius: '1rem',
                borderTopLeftRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography color="secondary.main" fontWeight={600}>
                Send Request
              </Typography>
              <Typography
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: 'secondary.light',
                }}
              >
                <CloseIcon onClick={isClose} />
              </Typography>
            </Box>

            <Box
              sx={{
                py: {
                  xs: 4,
                  lg: 4,
                },
                px: {
                  xs: 3,
                  lg: 4,
                },
              }}
            >
              <Box>
                <Formik
                  initialValues={{
                    budget: '',
                    dateTime: '',
                    service: '',
                  }}
                  onSubmit={(values) => handleSubmit(values)}
                  validationSchema={FormSchema}
                >
                  {({}) => (
                    <Form>
                      <Box>
                        {errorMsg?.msg && (
                          <Box>
                            {showError && (
                              <Alert severity="error">{errorMsg?.msg}</Alert>
                            )}
                          </Box>
                        )}
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ width: '100%' }}>
                            <Label text="Enter your budget" />
                            <FormInput
                              ariaLabel="budget"
                              name="budget"
                              type="text"
                              placeholder="NGN 54,000"
                            />
                          </Box>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                          <Label text="Event Date" />
                          <FormInput
                            ariaLabel="dateTime"
                            name="dateTime"
                            type="date"
                          />
                        </Box>
                        <Box>
                          <Label text="Select service" />
                          <FormInput
                            isSelect
                            ariaLabel="service"
                            name="service"
                          >
                            {queryData?.providerProfile?.company?.services?.map(
                              (service: any) => (
                                <MenuItem key={service} value={service}>
                                  {service}
                                </MenuItem>
                              ),
                            )}
                          </FormInput>
                        </Box>
                        <Box
                          mt={3}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <CustomButton
                            bgPrimary
                            smWidth="100%"
                            lgWidth="100%"
                            type="submit"
                            className="changeBtn"
                          >
                            {isLoading ? (
                              <FontAwesomeIcon icon={faCircleNotch} spin />
                            ) : (
                              'Send Request'
                            )}
                          </CustomButton>
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

export default CreateContractModal;
