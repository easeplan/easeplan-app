/* eslint-disable @typescript-eslint/no-use-before-define */
import theme from '@/styles/theme';
import { Box, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CustomButton from '../common/CustomButton';
import { formatCurrency } from '@/utils';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import customFetch from '@/utils/customFetch';
import axios from 'axios';

const API_URL = `http://apidev.us-east-1.elasticbeanstalk.com/api/v2`;

// Planner Price Card
const PlannerCard = ({
  basic,
  standard,
  premium,
  setOpenPremiumModal,
  setOpenStandardModal,
  token,
  data,
}: any) => {
  const { planData } = useSelector((state: RootState) => state.searchModal);
  const [basicLoading, setBasicLoading] = useState(false);
  const [standardLoading, setStandardLoading] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);

  const handleBasicPlan = async () => {
    setBasicLoading(true);
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
          type: `basic`,
        },
      };
      const { data } = await axios.post(
        `http://apidev.us-east-1.elasticbeanstalk.com/api/v2/planner-profiles/create-offer`,
        resData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        setBasicLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  Standard plan handler
  const handleStandardPlan = async () => {
    setStandardLoading(true);
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
          type: `standard`,
        },
      };
      const { data } = await axios.post(
        `http://apidev.us-east-1.elasticbeanstalk.com/api/v2/planner-profiles/create-offer`,
        resData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        setStandardLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  Premium plan handler
  const handlePremiumPlan = async () => {
    setPremiumLoading(true);
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
          type: `premium`,
        },
      };
      const { data } = await axios.post(
        `http://apidev.us-east-1.elasticbeanstalk.com/api/v2/planner-profiles/create-offer`,
        resData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.status === `success`) {
        setPremiumLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: `10px`,
        boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box p={4}>
        {basic && <Typography color="background.paper">Basic</Typography>}
        {standard && <Typography color="background.paper">Standard</Typography>}
        {premium && <Typography color="background.paper">Premium</Typography>}

        {basic && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(
              data?.package?.basic?.price
                ? data?.package?.basic?.price
                : `0.00`,
            )}
          </Typography>
        )}
        {standard && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(
              data?.package?.standard?.price
                ? data?.package?.standard?.price
                : `0.00`,
            )}
          </Typography>
        )}
        {premium && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(
              data?.package?.premium?.price
                ? data?.package?.premium?.price
                : `0.00`,
            )}
          </Typography>
        )}

        <Divider color="white" sx={{ marginTop: `2rem` }} />

        <Box sx={{ width: `100%`, margin: `auto` }}>
          <Typography color="grey.300" fontWeight={300} mt={3}>
            Features
          </Typography>
          {basic && (
            <div>
              {data?.package?.basic?.service?.map((items: any, index: any) => (
                <Box
                  key={index}
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                  }}
                  mt={2}
                >
                  <SendIcon
                    sx={{ color: `secondary.main`, fontSize: `0.9rem` }}
                  />
                  <Typography ml={2} color="background.paper" fontWeight={300}>
                    {items}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ textAlign: `center` }}>
                <CustomButton
                  mt={4}
                  lgWidth="100%"
                  mdWidth="100%"
                  smWidth="100%"
                  onClick={handleBasicPlan}
                  bgSecondary
                  loading={basicLoading}
                >
                  Request Plan
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
                      display: `flex`,
                      alignItems: `center`,
                    }}
                    mt={2}
                  >
                    <SendIcon
                      sx={{ color: `secondary.main`, fontSize: `0.9rem` }}
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
              <Box sx={{ textAlign: `center` }}>
                <CustomButton
                  mt={4}
                  lgWidth="100%"
                  onClick={handleStandardPlan}
                  bgSecondary
                  loading={standardLoading}
                >
                  Request Plan
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
                        display: `flex`,
                        alignItems: `center`,
                      }}
                      mt={2}
                    >
                      <SendIcon
                        sx={{ color: `secondary.main`, fontSize: `0.9rem` }}
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
              <Box sx={{ textAlign: `center` }}>
                <CustomButton
                  mt={4}
                  lgWidth="100%"
                  onClick={handlePremiumPlan}
                  bgSecondary
                  loading={premiumLoading}
                >
                  Request plan
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
        borderRadius: `10px`,
        boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box p={4}>
        <Typography color="background.paper">{title}</Typography>
        <Typography color="background.paper" mt={2} fontWeight={600}>
          {formatCurrency(amount)}
        </Typography>
        <Divider color="white" sx={{ marginTop: `2rem` }} />
      </Box>
    </Box>
  );
};

export { PlannerCard, VendorPricingCard };
