import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Field, FieldProps } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const style = {
  position: `absolute` as const,
  top: `30%`,
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
  textAlign: `center`,
  borderRadius: `8px`,
};

type Props = {
  name: string;
  label?: string;
  type?: 'text' | 'file';
  setProfileImg: any;
};

const ProfileFileInput: React.FC<Props> = ({
  name,
  setProfileImg,
  label,
  type = `text`,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const { setFieldValue } = form;

        const handleFileChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const { target } = event;
          if (type === `file`) {
            const file = (target?.files && target?.files[0]) || null;
            setProfileImg(
              (target?.files && URL.createObjectURL(target?.files[0])) || null,
            );

            setFieldValue(name, file);
          } else {
            const value = target?.value;
            setFieldValue(name, value);
          }
        };

        return (
          <div>
            <label htmlFor={name}>{label}</label>
            <input type="file" id={name} onChange={handleFileChange} />
          </div>
        );
      }}
    </Field>
  );
};

const ProfileImgSchema = Yup.object().shape({
  picture: Yup.string(),
});

export default function UpdateProfileModal({
  isOpen,
  isClose,
  token,
  queryData,
}: any) {
  const [previewProfileImg, setPreviewProfileImg] = useState();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials) =>
      customFetch.put(`/profiles/${userInfo}`, credentials, {
        headers: {
          'Content-Type': `multipart/form-data`,
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
    const formData = new FormData();
    formData.append(`picture`, credentials.picture);
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
                textAlign: `center`,
                pt: {
                  xs: 2,
                  lg: 4,
                },
                pb: {
                  xs: 2,
                  lg: 2,
                },
              }}
            >
              <Box>
                <Formik
                  initialValues={{
                    picture: queryData?.picture ? queryData?.picture : ``,
                  }}
                  onSubmit={(values) => updateProfileImg(values)}
                  validationSchema={ProfileImgSchema}
                >
                  {() => (
                    <Form>
                      <Box
                        sx={{
                          width: {
                            xs: `70px`,
                            sm: `70px`,
                            md: `100px`,
                            lg: `150px`,
                            xl: `150px`,
                          },
                          height: {
                            xs: `70px`,
                            sm: `70px`,
                            md: `100px`,
                            lg: `150px`,
                            xl: `150px`,
                          },
                          margin: `0 auto`,
                          position: `relative`,
                          borderRadius: `6px`,
                          backgroundColor: `primary.main`,
                          boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                        }}
                      >
                        <ChangeCoverImg htmlFor="picture">
                          <AddAPhotoOutlinedIcon className="icon" />
                          <ProfileFileInput
                            type="file"
                            setProfileImg={setPreviewProfileImg}
                            name="picture"
                          />
                        </ChangeCoverImg>
                        {previewProfileImg ? (
                          <Image
                            src={previewProfileImg}
                            alt="bannerImage"
                            fill
                            style={{
                              width: `100%`,
                              borderRadius: `6px`,
                              objectFit: `cover`,
                            }}
                          />
                        ) : (
                          <Image
                            src={queryData?.picture}
                            alt="bannerImage"
                            fill
                            style={{
                              width: `100%`,
                              borderRadius: `6px`,
                              objectFit: `cover`,
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        sx={{
                          textAlign: `center`,
                          width: `100%`,
                          display: `flex`,
                          alignItems: `center`,
                          flexWrap: `wrap`,
                          justifyContent: `center`,
                          padding: `1rem 0`,
                        }}
                      >
                        {previewProfileImg && (
                          <SaveButton type="submit">
                            {isLoading ? (
                              <FontAwesomeIcon icon={faCircleNotch} spin />
                            ) : (
                              `Save`
                            )}
                          </SaveButton>
                        )}
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
}

const ChangeCoverImg = styled(`label`)(({ theme }) => ({
  position: `absolute`,
  bottom: `0.2rem`,
  right: `-1.4rem`,
  zIndex: `9`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
  fontSize: `1.7rem`,
  textAlign: `center`,
  verticalAlign: `middle`,
  width: `50px`,
  height: `50px`,
  background: `#fff`,
  borderRadius: `50%`,
  color: theme.palette.primary.main,
  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },

  'input[type="file"]': {
    display: `none`,
  },

  '@media (max-width: 900px)': {
    width: `40px`,
    height: `40px`,

    '.icon': {
      fontSize: `1.2rem`,
    },
  },
}));

const SaveButton = styled(`button`)(({ theme }) => ({
  zIndex: `9`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
  fontSize: `1rem`,
  textAlign: `center`,
  verticalAlign: `middle`,
  padding: `0.5rem 3rem`,
  border: `none`,
  background: `#fff`,
  borderRadius: `6px`,
  fontWeight: `500`,
  transition: `all 0.5s ease`,
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },

  '@media (max-width: 900px)': {
    fontSize: `0.8rem`,
  },
}));
