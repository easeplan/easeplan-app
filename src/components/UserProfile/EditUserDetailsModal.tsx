import { useState } from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import toast from 'react-hot-toast';
import data from '@/lib/states.json';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import FormInput from '../common/FormInput';
import Label from '../common/Label';
import CustomButton from '../common/CustomButton';
import SelectState from '../common/SelectState';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import MultipleSelectCity from '../onboarding/MultipleSelectCity';
import MultipleSelectState from '../onboarding/MultipleSelectState';

const style = {
  position: 'absolute' as const,
  top: '40%',
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

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
});

const EditUserDetailsModal = ({ isOpen, isClose, token, queryData }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [selectedState, setSelectedState] = useState<any>();
  const [selectedCities, setSelectedCities] = useState<any>();
  const queryClient = useQueryClient();

  const allCities = data.states.reduce((cities, state) => {
    cities.push(...state.cities);
    return cities;
  }, [] as string[]) as string[];

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.put(`profiles/${userInfo}`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('Profile updated');
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
                  initialValues={{
                    firstName: queryData?.profile?.firstName
                      ? queryData?.profile?.firstName
                      : '',
                    lastName: queryData?.profile?.lastName
                      ? queryData?.profile?.lastName
                      : '',
                    operationStates: queryData?.providerProfile?.company
                      ?.operationStates
                      ? queryData?.providerProfile?.company?.operationStates
                      : '',
                    operationCities: queryData?.providerProfile?.company
                      ?.operationCities
                      ? queryData?.providerProfile?.company?.operationCities
                      : '',
                  }}
                  onSubmit={(values) => updateProfileImg(values)}
                  validationSchema={ProfileSchema}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Box>
                        <Box>
                          <div>
                            <Label text="First Name" />
                          </div>
                          <FormInput
                            ariaLabel="FirstName"
                            name="firstName"
                            type="text"
                            placeholder="e.g John"
                          />
                        </Box>
                        <Box>
                          <div>
                            <Label text="Last Name" />
                          </div>
                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="e.g mark"
                          />
                        </Box>
                        <Box>
                          <div>
                            <Label text="Operational State" />
                          </div>
                          <MultipleSelectState
                            name="operationStates"
                            setServices={setSelectedState}
                            states={data?.states}
                          />
                        </Box>
                        <Box>
                          <div>
                            <Label text="Operational Cities" />
                          </div>
                          <MultipleSelectCity
                            name="operationCities"
                            setServices={setSelectedCities}
                            cities={allCities}
                          />
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

export default EditUserDetailsModal;
