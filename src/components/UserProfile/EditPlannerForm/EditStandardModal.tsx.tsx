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
import FormInput from '../../common/FormInput';
import CustomButton from '../../common/CustomButton';
import Label from '../../common/Label';
import { services } from '@/lib/vendorServices';

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
  height: `70vh`,
  overflowX: `auto`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderRadius: `8px`,
};

const FormSchema = Yup.object().shape({
  catering: Yup.string(),
  dj: Yup.string(),
  entertainer: Yup.string(),
  eventDecorator: Yup.string(),
  mc: Yup.string(),
  makeUpArtist: Yup.string(),
  photographer: Yup.string(),
  printVendor: Yup.string(),
  securityPersonnel: Yup.string(),
  transportationCoordinator: Yup.string(),
  userhing: Yup.string(),
  venueManager: Yup.string(),
  videographer: Yup.string(),
  guest: Yup.string(),
  cost: Yup.string(),
});

const EditStandardModal = ({ isOpen, isClose, token, queryData }: any) => {
  const queryClient = useQueryClient();

  const { mutate: updateStandard, isLoading } = useMutation({
    mutationFn: (credentials) =>
      customFetch.put(`/providers/verification/package`, credentials, {
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

  const handleStandardServices = async (credentials: any) => {
    updateStandard(credentials);
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
                Standard Features
              </Typography>
              <Box sx={{ borderTop: `solid 1px #ccc` }}>
                <Formik
                  initialValues={{
                    catering: ``,
                    dj: ``,
                    entertainer: ``,
                    eventDecorator: ``,
                    mc: ``,
                    makeUpArtist: ``,
                    photographer: ``,
                    printVendor: ``,
                    securityPersonnel: ``,
                    transportationCoordinator: ``,
                    userhing: ``,
                    venueManager: ``,
                    videographer: ``,
                    guest: ``,
                    cost: ``,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={(values) => handleStandardServices(values)}
                >
                  {() => (
                    <Form>
                      <Box sx={{ flexGrow: 1, width: `100%` }}>
                        <Box>
                          <Description>
                            <p>Enter the amount for each of your services</p>
                          </Description>
                        </Box>
                        <Box>
                          <InputController>
                            {services?.map(
                              (data: any, i: any | null | undefined) => (
                                <Box key={i}>
                                  <Label text={data.label} />
                                  <FormInput
                                    ariaLabel={data.name}
                                    name={data.name}
                                    type="text"
                                    placeholder="Amount"
                                  />
                                </Box>
                              ),
                            )}
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

export default EditStandardModal;

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
