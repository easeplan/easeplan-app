import { useState } from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Field, FieldProps } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import FormInput from '../common/FormInput';
import Label from '../common/Label';
import CustomButton from '../common/CustomButton';
import SelectState from '../common/SelectState';
import data from '@/lib/states.json';

const style = {
  position: `absolute` as const,
  top: `40%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: {
    xs: `85%`,
    sm: 300,
    md: `30%`,
    lg: `30%`,
    xl: `30%`,
  },
  height: `auto`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderRadius: `8px`,
};

const ProfileSchema = Yup.object().shape({
  picture: Yup.string(),
});

const EditUserDetailsModal = ({ isOpen, isClose, token, queryData }: any) => {
  const [selectedState, setSelectedState] = useState<any>();
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials) =>
      customFetch.post(`/providers/profile`, credentials, {
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Profile updated`);
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
                    firstname: queryData?.details?.firstname
                      ? queryData?.details?.firstname
                      : ``,
                    lastname: queryData?.details?.lastname
                      ? queryData?.details?.lastname
                      : ``,
                    city: queryData?.city ? queryData?.city : ``,
                    state: queryData?.state ? queryData?.state : ``,
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
                            name="firstname"
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
                            name="lastname"
                            type="text"
                            placeholder="e.g mark"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: `grid`,
                            alignItems: `center`,
                            gap: `1rem`,
                            gridTemplateColumns: `1fr 1fr`,
                          }}
                        >
                          <Box>
                            <div>
                              <Label text="State" />
                            </div>
                            <SelectState
                              selectPlaceholder="Select State"
                              name="state"
                              onChange={(e: { target: { value: string } }) => {
                                const selectedState = data?.states.find(
                                  (state) => state.name === e.target.value,
                                );
                                setSelectedState(selectedState);
                                setFieldValue(`state`, e.target.value);
                                setFieldValue(`city`, ``);
                              }}
                            >
                              {data?.states?.map((state: any) => {
                                return (
                                  <MenuItem
                                    key={state?.name}
                                    value={state.name}
                                  >
                                    {state?.name}
                                  </MenuItem>
                                );
                              })}
                            </SelectState>
                          </Box>
                          {selectedState && (
                            <Box>
                              <div>
                                <Label text="City" />
                              </div>
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
                        </Box>
                        <Box
                          mt={2}
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `space-between`,
                          }}
                        >
                          <CustomButton
                            bgPrimary
                            smWidth="auto"
                            type="submit"
                            className="changeBtn"
                          >
                            {isLoading ? (
                              <FontAwesomeIcon icon={faCircleNotch} spin />
                            ) : (
                              `Save`
                            )}
                          </CustomButton>
                          <Box sx={{}} onClick={isClose}>
                            Cancel
                          </Box>
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
