import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import { Formik, Form } from 'formik';
import FormInput from '../common/FormInput';
import CustomButton from '../common/CustomButton';
import Label from '../common/Label';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const style = {
  position: `absolute` as const,
  top: `50%`,
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
  borderRadius: `8px`,
};

const VendorSchema = Yup.object().shape({
  maximum: Yup.string().required(`Maximum amount is required`),
  minimum: Yup.string().required(`Minimum amount is required`),
});

const EditVendorPriceModal = ({ isOpen, isClose, token, queryData }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.put(`profiles/${userInfo}`, credentials, {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Service Price Updated`);
      isClose(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleVendorPricing = async (credentials: any) => {
    const data = {
      budget: {
        maximum: credentials.maximum,
        minimum: credentials.minimum,
      },
    };
    updateProfile(data);
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
              <Typography
                fontWeight={600}
                variant="h6"
                color="primary.main"
                mb={2}
              >
                Service Pricing
              </Typography>
              <Box sx={{ borderTop: `solid 1px #ccc` }}>
                <Formik
                  initialValues={{
                    minimum: queryData?.budget?.minimum
                      ? queryData?.budget?.minimum
                      : ``,
                    maximum: queryData?.budget?.maximum
                      ? queryData?.budget?.maximum
                      : ``,
                  }}
                  validationSchema={VendorSchema}
                  onSubmit={(values) => handleVendorPricing(values)}
                >
                  {() => (
                    <Form>
                      <Box sx={{ flexGrow: 1, width: `100%` }}>
                        <Box>
                          <Description>
                            <p>
                              Enter the Maximum and Minimum amount of your
                              service
                            </p>
                          </Description>
                        </Box>
                        <Box>
                          <InputController>
                            <Box sx={{ pt: 2 }}>
                              <Label text="Maximum Amount" />
                              <FormInput
                                ariaLabel="maximum"
                                name="maximum"
                                type="number"
                                placeholder="Minimum amount"
                              />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              <Label text="Minimum Amount" />
                              <FormInput
                                ariaLabel="minimum"
                                name="minimum"
                                type="number"
                                placeholder="Minimum amount"
                              />
                            </Box>
                          </InputController>
                        </Box>
                        <Box
                          mt={4}
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `space-between`,
                          }}
                        >
                          <CustomButton
                            bgPrimary
                            smWidth="50%"
                            mdWidth="40%"
                            lgWidth="40%"
                            type="submit"
                            className="changeBtn"
                          >
                            {isLoading ? (
                              <FontAwesomeIcon icon={faCircleNotch} spin />
                            ) : (
                              `Save`
                            )}
                          </CustomButton>
                          <Typography
                            sx={{
                              cursor: `pointer`,
                              textAlign: `center`,
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

export default EditVendorPriceModal;

const Description = styled(`div`)({
  paddingTop: `1rem`,

  '.subTitle': {
    marginBottom: `1rem`,
  },

  '@media (max-width: 900px)': {
    marginTop: `0rem`,
    width: `100%`,
  },
});

const InputController = styled(`div`)(({ theme }) => ({
  width: `100%`,

  '.changeBtn': {
    padding: `1rem`,
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: `none`,
    outline: `none`,
    cursor: `pointer`,
  },

  '.flex': {
    display: `grid`,
    alignItems: `center`,
    gridTemplateColumns: `1fr 1fr`,
    gap: `2rem`,
    marginBottom: `2rem`,

    '.previewAvatar': {
      width: `80px`,
      height: `80px`,
      borderRadius: `50%`,
      background: theme.palette.primary.main,
    },
    '.uploadBtn': {
      padding: `1rem 2rem`,
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      border: `none`,
      outline: `none`,
      cursor: `pointer`,
      marginTop: `0.5rem`,
      whiteSpace: `noWrap`,
    },

    '@media (max-width: 900px)': {
      flexDirection: `column`,
      gridTemplateColumns: `1fr`,
      gap: `0rem`,
      marginBottom: `1rem`,

      '.previewAvatar': {
        width: `80px`,
        height: `80px`,
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
