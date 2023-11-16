/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from './common/FormInput';
import Label from './common/Label';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Divider from './common/Divider';
import { Box, MenuItem } from '@mui/material';
import Input from './common/Input';
import Image from 'next/image';
import CustomButton from './common/CustomButton';
import AvatarImg from '@/public/avatar.png';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import customFetch from '@/utils/customFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
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

const ProfileForm = ({ token, queryData }: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfrimPassword] = useState(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [fileName, setFileName] = useState<any>(null);
  const [previewImg, setPreviewImg] = useState<any>(
    queryData?.profile?.picture ? queryData?.profile?.picture : null,
  );

  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials) =>
      customFetch.put(`profiles/${userInfo}`, credentials, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('Profile updated');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const submitCredentials = async (credentials: any) => {
    const formData = new FormData();
    formData.append('picture', credentials.picture);
    updateProfile(credentials);
  };

  return (
    <Section>
      <h3 className="title">Profile Settings</h3>
      <Formik
        initialValues={{
          firstName: queryData?.profile?.firstName
            ? queryData?.profile?.firstName
            : '',
          lastName: queryData?.profile?.lastName
            ? queryData?.profile?.lastName
            : '',
          picture: queryData?.profile?.picture
            ? queryData?.profile?.picture
            : '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={ProfileSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <Flex>
              <Description>
                <h4 className="subTitle">Profile</h4>
                <p>
                  This information will be shown publicly so be careful what
                  information you provide
                </p>
              </Description>
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: '1rem',
                  }}
                >
                  <div>
                    <AddButton htmlFor="picture">
                      {queryData?.profile?.picture
                        ? 'Change Photo'
                        : 'Add Photo'}
                      <Input
                        type="file"
                        setPreviewImg={setPreviewImg}
                        setFileName={setFileName}
                        name="picture"
                      />
                    </AddButton>
                  </div>
                  <div>
                    {previewImg === null ? (
                      <div>
                        <Image
                          src={AvatarImg}
                          alt="profileImg"
                          height={50}
                          width={50}
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                    ) : (
                      <Box>
                        <Image
                          src={previewImg}
                          alt="profileImg"
                          height={60}
                          width={60}
                          style={{ borderRadius: '50%' }}
                        />
                      </Box>
                    )}
                  </div>
                </Box>
                {/* <div className="flex">
                  <div>
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
                          <MenuItem key={state?.name} value={state.name}>
                            {state?.name}
                          </MenuItem>
                        );
                      })}
                    </SelectState>
                  </div>
                  {selectedState && (
                    <div>
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
                    </div>
                  )}
                </div> */}
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
                            type={showPassword ? 'text' : 'password'}
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
                            type={showConfirmPassword ? 'text' : 'password'}
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
                  <PasswordBtn
                    onClick={() => setChangePassword(!changePassword)}
                  >
                    {changePassword ? 'Hide Password' : 'Change Password'}
                  </PasswordBtn>
                </div>
              </InputController>
            </Flex>
            <Divider />
            <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
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
    </Section>
  );
};

const Section = styled('div')(({ theme }) => ({
  marginTop: '4rem',
  color: theme.palette.primary.main,

  '.title': {
    marginTop: '0.6rem',
    borderBottom: 'solid 0.5px #ccc',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem',
  },

  '@media (max-width: 900px)': {
    marginTop: '2rem',
  },
}));

const PasswordBtn = styled('label')(({ theme }) => ({
  display: 'inline-block',
  padding: '0.8rem 2rem',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center',
  verticalAlign: 'middle',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  border: `solid 1px ${theme.palette.primary.main}`,
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },

  'input[type="file"]': {
    display: 'none',
  },

  '@media (max-width: 900px)': {},
}));

const AddButton = styled('label')(({ theme }) => ({
  display: 'inline-block',
  padding: '0.8rem 2rem',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center',
  verticalAlign: 'middle',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  border: `solid 1px ${theme.palette.primary.main}`,
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },

  'input[type="file"]': {
    display: 'none',
  },

  '@media (max-width: 900px)': {},
}));

const Flex = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '6rem',
  marginBottom: '1rem',

  '@media (max-width: 900px)': {
    flexDirection: 'column',
    gap: '2rem',
  },
});

const Description = styled('div')({
  marginTop: '2rem',
  width: '70%',

  '.subTitle': {
    marginBottom: '1rem',
  },

  '@media (max-width: 900px)': {
    marginTop: '1rem',
    width: '100%',
  },
});

const InputController = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: '2rem',

  '.changeBtn': {
    padding: '1rem',
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },

  '.img-flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem',

    '.previewAvatar': {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
    },
  },

  '.flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem',

    '@media (max-width: 900px)': {
      flexDirection: 'column',
      gridTemplateColumns: '1fr',
      gap: '0rem',
      marginBottom: '1rem',

      '.previewAvatar': {
        width: '70px',
        height: '70px',
        marginTop: '1rem',
      },

      '.uploadBtn': {
        padding: '0.8rem 2rem',
        fontSize: '0.8rem',
      },
    },
  },

  '@media (max-width: 900px)': {
    marginTop: '1rem',
    '.changeBtn': {
      padding: '0.7rem 1.5rem',
      border: 'none',
    },
  },
}));

const PasswordControl = styled('div')(({ theme }) => ({
  position: 'relative',
  '.password': {
    position: 'absolute',
    top: '1.2rem',
    right: '1rem',
    fontSize: '1.3rem',
    color: theme.palette.grey[500],
  },
  '@media (max-width: 1020px)': {
    '.password': {
      position: 'absolute',
      top: '1.3rem',
      right: '1rem',
      fontSize: '1rem',
    },
  },
}));

export default ProfileForm;
