import { useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../common/Input';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import ProfilePhoto from './ProfilePhoto';
import BannerImg from '@/public/banner.png';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const CoverImageSchema = Yup.object().shape({
  image: Yup.string(),
});

const CoverBanner = ({ queryData, token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [previewBannerImg, setPreviewBannerImg] = useState();
  const [fileName, setFileName] = useState();

  const queryClient = useQueryClient();

  const { mutate: updateBannerImg, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.put(`/profiles/${userInfo}`, credentials, {
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Saved`);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const updateCoverBanner = async (credentials: any) => {
    const formData = new FormData();
    formData.append(`image`, credentials.image);
    updateBannerImg(credentials);
  };

  return (
    <Box
      sx={{
        width: `100%`,
        height: {
          xs: `120px`,
          sm: `130px`,
          md: `200px`,
          lg: `200px`,
          xl: `300px`,
        },
        my: `1rem`,
        borderRadius: `10px`,
        position: `relative`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
      }}
    >
      <Formik
        initialValues={{
          image: queryData?.providerProfile?.company?.image
            ? queryData?.providerProfile?.company?.image
            : ``,
        }}
        onSubmit={(values) => updateCoverBanner(values)}
        validationSchema={CoverImageSchema}
      >
        {() => (
          <Form>
            <Box>
              <ChangeCoverImg htmlFor="image">
                <CreateOutlinedIcon />
                <Input
                  type="file"
                  setPreviewImg={setPreviewBannerImg}
                  setFileName={setFileName}
                  name="image"
                />
              </ChangeCoverImg>
              {previewBannerImg ? (
                <Image
                  src={previewBannerImg}
                  alt="bannerImage"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    height: `100%`,
                    borderRadius: `10px`,
                    objectFit: `cover`,
                  }}
                />
              ) : (
                <Image
                  src={
                    queryData?.providerProfile?.company?.image
                      ? queryData?.providerProfile?.company?.image
                      : BannerImg
                  }
                  alt="bannerImage"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    height: `100%`,
                    borderRadius: `10px`,
                    objectFit: `cover`,
                  }}
                />
              )}
              {previewBannerImg && (
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
      <ProfilePhoto token={token} queryData={queryData} />
    </Box>
  );
};

const ChangeCoverImg = styled(`label`)(({ theme }) => ({
  position: `absolute`,
  top: `1rem`,
  right: `1rem`,
  zIndex: `1`,
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
    fontSize: `0.7rem`,
    top: `0.5rem`,
  },
}));

const SaveButton = styled(`button`)(({ theme }) => ({
  position: `absolute`,
  bottom: `1rem`,
  right: `1rem`,
  zIndex: `1`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
  fontSize: `1rem`,
  textAlign: `center`,
  verticalAlign: `middle`,
  padding: `0.4rem 1rem`,
  border: `none`,
  background: `#fff`,
  borderRadius: `6px`,
  fontWeight: `500`,
  transition: `all 0.5s ease`,
  color: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },

  'input[type="file"]': {
    display: `none`,
  },

  '@media (max-width: 900px)': {
    fontSize: `0.8rem`,
    bottom: `0.5rem`,
  },
}));

export default CoverBanner;
