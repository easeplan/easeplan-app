/* eslint-disable @typescript-eslint/no-use-before-define */
import theme from '@/styles/theme';
import { Box, Divider, Button, Typography } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CustomButton from '../common/CustomButton';
import { formatCurrency } from '@/utils';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOpenSearchModal,
  setOpenPlannerModal,
} from '@/features/searchResultSlice';
import customFetch from '@/utils/customFetch';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import SuccessModal from '../common/SuccessModal';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Planner Price Card
const PlannerCard = ({ basic, standard, premium, token, data }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { planData } = useSelector((state: RootState) => state.searchModal);
  const [basicModal, setBasicModal] = useState(false);
  const [standardModal, setStandardModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [premiumModal, setPremiumModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [contractID, setContractID] = useState();
  const [recieverID, setrecieverID] = useState();

  const handleBasicModal = () => {
    setBasicModal(true);
  };

  const handleBasicPlan = async () => {
    setIsLoading(true);
    try {
      const resData = {
        state: planData?.state,
        city: planData?.city,
        budget: planData?.budget,
        dateTime: planData?.dateTime,
        profileId: planData?.profileId,
        role: planData?.role,
        package: {
          service: planData?.package?.basic?.service,
          type: 'basic',
        },
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/planner-profiles/create-offer`,
        resData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data.status === 'success') {
        setBasicModal(false);
        localStorage.setItem('contractID', `${data?.data?._id}`);
        localStorage.setItem('contractRole', `${data?.data?._id}`);
        localStorage.setItem(
          'recieverID',
          `${data?.data?.parties?.receiverId}`,
        );
        setContractID(data?.data?._id);
        setIsLoading(false);
        setSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleOpenStandardModal = () => {
    setStandardModal(true);
  };

  //  Standard plan handler
  const handleStandardPlan = async () => {
    setIsLoading(true);
    try {
      const resData = {
        state: planData?.state,
        city: planData?.city,
        budget: planData?.budget,
        dateTime: planData?.dateTime,
        profileId: planData?.profileId,
        role: planData?.role,
        package: {
          service: planData?.package?.standard?.service,
          type: 'standard',
        },
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/planner-profiles/create-offer`,
        resData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data.status === 'success') {
        localStorage.setItem('contractID', `${data?.data?._id}`);
        localStorage.setItem('contractRole', `${data?.data?._id}`);
        localStorage.setItem(
          'recieverID',
          `${data?.data?.parties?.receiverId}`,
        );
        setContractID(data?.data?._id);
        setStandardModal(false);
        setIsLoading(false);
        setSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePremiumModal = () => {
    setPremiumModal(true);
  };
  //  Premium plan handler
  const handlePremiumPlan = async () => {
    setIsLoading(true);
    try {
      const resData = {
        state: planData?.state,
        city: planData?.city,
        budget: planData?.budget,
        dateTime: planData?.dateTime,
        profileId: planData?.profileId,
        role: planData?.role,
        package: {
          service: planData?.package?.premium?.service,
          type: 'premium',
        },
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/planner-profiles/create-offer`,
        resData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data.status === 'success') {
        localStorage.setItem('contractID', `${data?.data?._id}`);
        localStorage.setItem('contractRole', `${data?.data?._id}`);
        localStorage.setItem(
          'recieverID',
          `${data?.data?.parties?.receiverId}`,
        );
        setContractID(data?.data?._id);
        setPremiumModal(false);
        setIsLoading(false);
        setSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    dispatch(setOpenSearchModal(false));
    dispatch(setOpenPlannerModal(false));
    setSuccessModal(false);
  };

  const handleRedirect = () => {
    setIsLoading(true);
    router.push(`/account/event/${contractID}`);
  };

  return (
    <Box
      sx={{
        borderRadius: '10px',
        boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <SuccessModal
        isOpen={successModal}
        isClose={() => setSuccessModal(false)}
        title="Request sent Successfully"
        message="You will get a feedback within 24 hours from the Planner"
      >
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column-reverse',
              md: 'row',
              lg: 'row',
            },
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: {
                xs: '20%',
                sm: '20%',
                md: '20%',
                lg: '20%',
                xl: '20%',
              },
              borderRadius: '10px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontSize: '0.8rem',
              mt: {
                xs: 2,
                sm: 2,
                md: '0',
              },
            }}
            onClick={handleCloseModal}
          >
            Done
          </Button>
          <Link href={`/account/event/${contractID}`}>
            <Button
              variant="contained"
              style={{ color: theme.palette.secondary.main }}
            >
              View Details
            </Button>
          </Link>
        </Box>
      </SuccessModal>
      <ConfirmModal
        isOpen={
          basicModal
            ? handleBasicPlan
            : standardModal
            ? handleStandardPlan
            : premiumModal
            ? handlePremiumPlan
            : null
        }
        isClose={() =>
          basicModal
            ? setBasicModal(false)
            : standardModal
            ? setStandardModal(false)
            : premiumModal
            ? setPremiumModal(false)
            : null
        }
      >
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
            <Typography>Proceed to Event</Typography>
            <Box
              my={3}
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
                loading={isLoading}
                onClick={
                  basicModal
                    ? handleBasicPlan
                    : standardModal
                    ? handleStandardPlan
                    : premiumModal
                    ? handlePremiumPlan
                    : null
                }
              >
                Proceed
              </CustomButton>
            </Box>
            <Divider />
            <Typography mt={2}>Cancel Event</Typography>
            <Box
              mt={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#cccc',
                  textAlign: 'center',
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
                onClick={() =>
                  basicModal
                    ? setBasicModal(false)
                    : standardModal
                    ? setStandardModal(false)
                    : premiumModal
                    ? setPremiumModal(false)
                    : null
                }
              >
                Cancel
              </Box>
            </Box>
          </Box>
        </Box>
      </ConfirmModal>
      <Box p={4}>
        {basic && <Typography color="background.paper">Basic</Typography>}
        {standard && <Typography color="background.paper">Standard</Typography>}
        {premium && <Typography color="background.paper">Premium</Typography>}

        {basic && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(
              data?.package?.basic?.price
                ? data?.package?.basic?.price
                : '0.00',
            )}
          </Typography>
        )}
        {standard && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(
              data?.package?.standard?.price
                ? data?.package?.standard?.price
                : '0.00',
            )}
          </Typography>
        )}
        {premium && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(
              data?.package?.premium?.price
                ? data?.package?.premium?.price
                : '0.00',
            )}
          </Typography>
        )}

        <Divider color="white" sx={{ marginTop: '2rem' }} />

        <Box sx={{ width: '100%', margin: 'auto' }}>
          <Typography color="grey.300" fontWeight={300} mt={3}>
            Features
          </Typography>
          {basic && (
            <div>
              {data?.package?.basic?.service?.map((items: any, index: any) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  mt={2}
                >
                  <SendIcon
                    sx={{ color: 'secondary.main', fontSize: '0.9rem' }}
                  />
                  <Typography ml={2} color="background.paper" fontWeight={300}>
                    {items}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ textAlign: 'center' }}>
                <CustomButton
                  mt={4}
                  lgWidth="100%"
                  mdWidth="100%"
                  smWidth="100%"
                  onClick={handleBasicModal}
                  bgSecondary
                >
                  Select
                </CustomButton>
              </Box>
            </div>
          )}
          {standard && (
            <div>
              {data?.package?.standard?.service?.map(
                (items: any, index: any) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    mt={2}
                  >
                    <SendIcon
                      sx={{ color: 'secondary.main', fontSize: '0.9rem' }}
                    />
                    <Typography
                      ml={2}
                      color="background.paper"
                      fontWeight={300}
                    >
                      {items}
                    </Typography>
                  </Box>
                ),
              )}
              <Box sx={{ textAlign: 'center' }}>
                <CustomButton
                  mt={4}
                  lgWidth="100%"
                  onClick={handleOpenStandardModal}
                  bgSecondary
                >
                  Select
                </CustomButton>
              </Box>
            </div>
          )}
          {premium && (
            <div>
              {data?.package?.premium?.service?.map(
                (items: any, index: any) => (
                  <>
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      mt={2}
                    >
                      <SendIcon
                        sx={{ color: 'secondary.main', fontSize: '0.9rem' }}
                      />
                      <Typography
                        ml={2}
                        color="background.paper"
                        fontWeight={300}
                        textTransform="capitalize"
                      >
                        {items}
                      </Typography>
                    </Box>
                  </>
                ),
              )}
              <Box sx={{ textAlign: 'center' }}>
                <CustomButton
                  mt={4}
                  lgWidth="100%"
                  onClick={handlePremiumModal}
                  bgSecondary
                >
                  Select
                </CustomButton>
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Vendor Price Card
const VendorPricingCard = ({ amount, title }: any) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box p={4}>
        <Typography color="background.paper">{title}</Typography>
        <Typography color="background.paper" mt={2} fontWeight={600}>
          {formatCurrency(amount)}
        </Typography>
        <Divider color="white" sx={{ marginTop: '2rem' }} />
      </Box>
    </Box>
  );
};

export { PlannerCard, VendorPricingCard };
