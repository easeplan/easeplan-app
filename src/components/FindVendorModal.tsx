import { Box, Typography, MenuItem, Alert } from '@mui/material';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import FormInput from './common/FormInput';
import Label from './common/Label';
import CustomButton from './common/CustomButton';
import SelectState from './common/SelectState';
import data from '@/lib/states.json';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  setOpenSearchModal,
  setUpdateData,
  setLoadingResult,
  setErrorMsg,
} from '@/features/searchResultSlice';

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

const services = [
  'Dj',
  'Catering',
  'Photographer',
  'MC',
  'Make-up Artist',
  'Venue manager',
  'Event decorator',
  'Transportation coordinator',
  'Security personnel',
  'Videographer',
  'Print vendor',
  'Userhing',
  'Entertainer',
];

const FormSchema = Yup.object().shape({
  state: Yup.string().required('State is missing'),
  city: Yup.string().required('City is missing'),
  guest: Yup.string().required('Guest is missing'),
  eventDate: Yup.string().required('Date is missing'),
  selectedService: Yup.string().required('Service Type is missing'),
});

const FindVendorModal = ({ isOpen, isClose, token, queryData }: any) => {
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state: RootState) => state.searchModal);
  const [selectedState, setSelectedState] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleSubmit = async (credentials: any) => {
    setIsLoading(true);
    const queryString = Object.keys(credentials)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(credentials[key])}`,
      )
      .join('&');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/provider-profiles/profiles/search?${queryString}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        },
      );
      const data = await res.json();
      dispatch(setUpdateData(data?.data[0] && data?.data[0]));
      dispatch(setErrorMsg(data?.data && data?.data));
      setIsLoading(false);
      if (data?.data?.msg) {
        setShowError(true);
      }
      if (data?.data[0] || data?.data?.matchedServiceProviders[0]) {
        dispatch(setOpenSearchModal(true));
        dispatch(setLoadingResult(true));
        setTimeout(() => {
          dispatch(setLoadingResult(false));
        }, 4000);
      }
    } catch (error) {
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
                Find Vendor
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
                    state: queryData?.state ? queryData?.state : '',
                    city: queryData?.city ? queryData?.city : '',
                    guest: '',
                    eventDate: '',
                    selectedService: '',
                  }}
                  onSubmit={(values) => handleSubmit(values)}
                  validationSchema={FormSchema}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Box>
                        {errorMsg?.msg && (
                          <Box>
                            {showError && (
                              <Alert severity="error">{errorMsg?.msg}</Alert>
                            )}
                          </Box>
                        )}
                        <Box>
                          <Label text="State" />
                          <SelectState
                            selectPlaceholder="Select State"
                            name="state"
                            onChange={(e: { target: { value: string } }) => {
                              const selectedState = data?.states.find(
                                (state) => state.name === e.target.value,
                              );
                              setSelectedState(selectedState);
                              setFieldValue('state', e.target.value);
                              setFieldValue('city', '');
                            }}
                          >
                            {data?.states?.map((state: any) => {
                              return (
                                <MenuItem key={state?.name} value={state.name}>
                                  {state?.name}
                                </MenuItem>
                              );
                            })}
                          </SelectState>
                        </Box>
                        {selectedState && (
                          <Box>
                            <Label text="City" />
                            <FormInput
                              isSelect
                              selectPlaceholder="Select City"
                              name="city"
                            >
                              {selectedState?.cities?.map((city: any) => {
                                return (
                                  <MenuItem key={city} value={city}>
                                    {city}
                                  </MenuItem>
                                );
                              })}
                            </FormInput>
                          </Box>
                        )}
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ width: '50%' }}>
                            <Label text="Number Of Guests" />
                            <FormInput
                              ariaLabel="guest"
                              name="guest"
                              type="text"
                              placeholder="430"
                            />
                          </Box>
                          <Box sx={{ width: '50%' }}>
                            <Label text="Event Date" />
                            <FormInput
                              ariaLabel="eventDate"
                              name="eventDate"
                              type="date"
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ width: '50%' }}>
                            <Label text="Minimum Budget" />
                            <FormInput
                              ariaLabel="budget"
                              name="budget"
                              type="text"
                              placeholder="NGN 54,000"
                            />
                          </Box>
                          <Box sx={{ width: '50%' }}>
                            <Label text="Select Event Type" />
                            <FormInput
                              isSelect
                              selectPlaceholder="Select Services"
                              ariaLabel="selectedService"
                              name="selectedService"
                            >
                              {services?.map((service) => (
                                <MenuItem key={service} value={service}>
                                  {service}
                                </MenuItem>
                              ))}
                            </FormInput>
                          </Box>
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
                              'Search'
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

export default FindVendorModal;
