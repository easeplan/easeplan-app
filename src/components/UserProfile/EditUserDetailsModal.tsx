import { Box, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import toast from 'react-hot-toast';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import CustomButton from '../common/CustomButton';
import { useAuth } from '@/hooks/authContext';

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
  const { user } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = user?._id;
  const queryClient = useQueryClient();

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
    console.log(credentials);
    updateProfile(credentials);
  };

  const cities = [
    'Ikeja',
    'Lekki',
    'Victoria Island',
    'Ibadan',
    'Ogbomosho',
    'Oyo',
    'Aba',
    'Umuahia',
    'Ohafia',
    'Yola',
    'Mubi',
    'Jimeta',
    'Uyo',
    'Ikot Ekpene',
    'Eket',
    'Awka',
    'Onitsha',
    'Nnewi',
    'Bauchi',
    'Katagum',
    'Jamaare',
    'Yenagoa',
    'Brass',
    'Sagbama',
    'Makurdi',
    'Otukpo',
    'Gboko',
    'Maiduguri',
    'Biu',
    'Bama',
    'Calabar',
    'Ogoja',
    'Obudu',
    'Asaba',
    'Warri',
    'Sapele',
    'Abakaliki',
    'Afikpo',
    'Ishielu',
    'Benin City',
    'Auchi',
    'Uromi',
    'Ado-Ekiti',
    'Ikere',
    'Ilawe',
    'Enugu',
    'Nsukka',
    'Oji-River',
    'Abuja',
    'Gwagwalada',
    'Kuje',
    'Dutse',
    'Hadejia',
    'Gumel',
    'Kaduna',
    'Zaria',
    'Kafanchan',
    'Kano',
    'Fagge',
    'Dala',
    'Katsina',
    'Funtua',
    'Daura',
    'Birnin Kebbi',
    'Argungu',
    'Yauri',
    'Lokoja',
    'Okene',
    'Idah',
    'Ilorin',
    'Offa',
    'Omu-Aran',
    'Lafia',
    'Keffi',
    'Akwanga',
    'Minna',
    'Bida',
    'Suleja',
    'Abeokuta',
    'Ijebu-Ode',
    'Sagamu',
    'Osogbo',
    'Ile-Ife',
    'Ilesa',
    'Jos',
    'Pankshin',
    'Riyom',
    'Port Harcourt',
    'Okrika',
    'Omoku',
    'Sokoto',
    'Gwadabawa',
    'Tambuwal',
    'Jalingo',
    'Wukari',
    'Bali',
    'Damaturu',
    'Potiskum',
    'Gujba',
    'Gusau',
    'Anka',
    'Maru',
  ];
  const states = [
    'Lagos',
    'Oyo',
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];
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
                  {({ setFieldValue, touched, errors }) => (
                    <Form>
                      <Box>
                        <Box>
                          {/* <div>
                            <Label text="First Name" />
                          </div> */}
                          <Field
                            sx={{
                              width: '100%',
                              marginTop: '0.5rem',
                              marginBottom: '0.5rem',
                            }}
                            as={TextField}
                            label="Last Name"
                            name="firstName"
                            type="text"
                            placeholder="e.g John"
                            helperText={touched.firstName && errors.firstName}
                            error={
                              touched.firstName && Boolean(errors.firstName)
                            }
                          />
                        </Box>
                        <Box>
                          {/* <div>
                            <Label text="Last Name" />
                          </div> */}
                          <Field
                            sx={{
                              width: '100%',
                              marginTop: '0.5rem',
                              marginBottom: '0.5rem',
                            }}
                            as={TextField}
                            label="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="e.g mark"
                            helperText={touched.lastName && errors.lastName}
                            error={touched.lastName && Boolean(errors.lastName)}
                          />
                        </Box>
                        <Box>
                          {/* <div>
                            <Label text="Operational State" />
                          </div> */}
                          <Autocomplete
                            multiple
                            sx={{
                              width: '100%',
                              marginTop: '0.5rem',
                              marginRight: '0.5rem ',
                            }}
                            freeSolo
                            onChange={(event, value) =>
                              setFieldValue('operationStates', value)
                            }
                            options={states}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Operational States"
                                placeholder="State"
                                name="operationStates"
                                error={
                                  touched.operationStates &&
                                  Boolean(errors.operationStates)
                                }
                              />
                            )}
                          />
                        </Box>
                        <Box>
                          {/* <div>
                            <Label text="Operational Cities" />
                          </div> */}
                          <Autocomplete
                            multiple
                            sx={{
                              width: '100%',
                              marginTop: '0.5rem',
                              marginRight: '0.5rem ',
                            }}
                            freeSolo
                            onChange={(event, value) =>
                              setFieldValue('operationCities', value)
                            }
                            options={cities}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Operational Cities"
                                placeholder="State"
                                name="operationCities"
                                error={
                                  touched.operationCities &&
                                  Boolean(errors.operationCities)
                                }
                              />
                            )}
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
