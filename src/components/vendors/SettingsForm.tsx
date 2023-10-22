import React from 'react';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import Label from '../common/Label';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import customFetch from '@/utils/customFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import CustomButton from '../common/CustomButton';
import AvatarImg from '@/public/avatar.png';
import Input from '../common/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Divider from '../common/Divider';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required(`First Name is required`),
  lastName: Yup.string().required(`Last Name is required`),
  city: Yup.string(),
  state: Yup.string(),
  picture: Yup.string(),
  password: Yup.string(),
  confirmPassword: Yup.string(),
});

interface Props {
  token: string;
  queryData: any;
}

const SettingsForm = ({ token, queryData }: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfrimPassword] = useState(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [fileName, setFileName] = useState<any>(null);
  const [previewImg, setPreviewImg] = useState<any>(
    queryData?.provider?.profile?.picture
      ? queryData?.provider?.profile?.picture
      : null,
  );

  console.log(userInfo);

  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials) =>
      customFetch.put(`profiles/${userInfo}`, credentials, {
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

  const submitCredentials = async (credentials: any) => {
    const formData = new FormData();
    formData.append(`picture`, credentials.picture);
    updateProfile(credentials);
  };

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: `10px`,
        boxShadow: `0px 1.82797px 12.0699px rgba(0, 0, 0, 0.2)`,
        mt: 7,
      }}
    >
      <Formik
        initialValues={{
          firstName: queryData?.provider?.profile?.firstName
            ? queryData?.provider?.profile?.firstName
            : ``,
          lastName: queryData?.provider?.profile?.lastName
            ? queryData?.provider?.profile?.lastName
            : ``,
          picture: queryData?.provider?.profile?.picture
            ? queryData?.provider?.profile?.picture
            : ``,
          password: ``,
          confirmPassword: ``,
        }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={ProfileSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <Box mb={4}>
              <Box
                sx={{
                  width: `100%`,
                  textAlign: `center`,
                }}
              >
                <div>
                  {previewImg === null ? (
                    <div>
                      <Image
                        src={AvatarImg}
                        alt="profileImg"
                        height={100}
                        width={100}
                        style={{ borderRadius: `50%` }}
                      />
                    </div>
                  ) : (
                    <Box>
                      <Image
                        src={previewImg}
                        alt="profileImg"
                        height={60}
                        width={60}
                        style={{ borderRadius: `50%` }}
                      />
                    </Box>
                  )}
                </div>
                <div>
                  <AddButton htmlFor="picture">
                    {queryData?.provider?.profile?.picture
                      ? `Change Photo`
                      : `Add Photo`}
                    <Input
                      type="file"
                      setPreviewImg={setPreviewImg}
                      setFileName={setFileName}
                      name="picture"
                    />
                  </AddButton>
                </div>
              </Box>
              <InputController>
                <div className="flex">
                  <div>
                    <div>
                      <Label text="First Name" />
                    </div>
                    <FormInput
                      ariaLabel="FirstName"
                      name="firstName"
                      type="text"
                      placeholder="e.g John"
                    />
                  </div>
                  <div>
                    <div>
                      <Label text="Last Name" />
                    </div>
                    <FormInput
                      ariaLabel="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="e.g mark"
                    />
                  </div>
                </div>

                <div>
                  {changePassword ? (
                    <>
                      <div>
                        <div>
                          <Label text="Password" />
                        </div>
                        <PasswordControl>
                          <FormInput
                            ariaLabel="Password"
                            name="password"
                            type={showPassword ? `text` : `password`}
                            placeholder="Password"
                          />
                          <div
                            className="password"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </div>
                        </PasswordControl>
                      </div>
                      <div>
                        <div>
                          <Label text="Confirm Password" />
                        </div>
                        <PasswordControl>
                          <FormInput
                            ariaLabel="confirm password"
                            name="confirmpassword"
                            type={showConfirmPassword ? `text` : `password`}
                            placeholder="Confirm Password"
                          />
                          <div
                            className="password"
                            onClick={() =>
                              setShowConfrimPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </div>
                        </PasswordControl>
                      </div>
                    </>
                  ) : null}
                  <Button
                    variant="outlined"
                    sx={{ textTransform: `capitalize`, mt: 4 }}
                    onClick={() => setChangePassword(!changePassword)}
                  >
                    {changePassword ? `Hide Password` : `Change Password`}
                  </Button>
                </div>
              </InputController>
            </Box>
            <Divider />
            <Box sx={{ textAlign: `right`, marginTop: `1rem` }}>
              <CustomButton
                bgPrimary
                lgWidth="20%"
                smWidth="20%"
                mdWidth="20%"
                loading={isLoading}
                loadingText="Saving..."
                type="submit"
              >
                SAVE
              </CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const AddButton = styled(`label`)(({ theme }) => ({
  display: `inline-block`,
  padding: `0.5rem 2rem`,
  cursor: `pointer`,
  fontSize: `14px`,
  textAlign: `center`,
  verticalAlign: `middle`,
  borderRadius: `8px`,
  backgroundColor: `transparent`,
  color: theme.palette.primary.main,
  border: `solid 1px ${theme.palette.primary.main}`,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },

  'input[type="file"]': {
    display: `none`,
  },

  '@media (max-width: 900px)': {},
}));

const InputController = styled(`div`)(({ theme }) => ({
  width: `100%`,
  marginTop: `2rem`,

  '.changeBtn': {
    padding: `1rem`,
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: `none`,
    outline: `none`,
    cursor: `pointer`,
  },

  '.img-flex': {
    display: `grid`,
    alignItems: `center`,
    gridTemplateColumns: `1fr 1fr`,
    justifyContent: `space-between`,
    gap: `2rem`,
    marginBottom: `2rem`,

    '.previewAvatar': {
      width: `70px`,
      height: `70px`,
      borderRadius: `50%`,
      background: theme.palette.primary.main,
    },
  },

  '.flex': {
    display: `grid`,
    alignItems: `center`,
    gridTemplateColumns: `1fr 1fr`,
    justifyContent: `space-between`,
    gap: `2rem`,
    marginBottom: `2rem`,

    '@media (max-width: 900px)': {
      flexDirection: `column`,
      gridTemplateColumns: `1fr`,
      gap: `0rem`,
      marginBottom: `1rem`,

      '.previewAvatar': {
        width: `70px`,
        height: `70px`,
        marginTop: `1rem`,
      },

      '.uploadBtn': {
        padding: `0.8rem 2rem`,
        fontSize: `0.8rem`,
      },
    },
  },

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
    '.changeBtn': {
      padding: `0.7rem 1.5rem`,
      border: `none`,
    },
  },
}));

const PasswordControl = styled(`div`)(({ theme }) => ({
  position: `relative`,
  '.password': {
    position: `absolute`,
    top: `1.2rem`,
    right: `1rem`,
    fontSize: `1.3rem`,
    color: theme.palette.grey[500],
  },
  '@media (max-width: 1020px)': {
    '.password': {
      position: `absolute`,
      top: `1.3rem`,
      right: `1rem`,
      fontSize: `1rem`,
    },
  },
}));

export default SettingsForm;
