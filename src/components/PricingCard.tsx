import { useState } from 'react';
import theme from '@/styles/theme';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import CustomButton from './common/CustomButton';
import Link from 'next/link';
import { formatCurrency } from '@/utils';

const PlannerCard = ({ basic, standard, premium, data }: any) => {
  const [basicTotal] = useState(
    data?.packages?.basic?.map((amount: any) => amount?.amount),
  );
  const [standardTotal] = useState(
    data?.packages?.standard?.map((amount: any) => amount?.amount),
  );
  const [premiumTotal] = useState(
    data?.packages?.premium?.map((amount: any) => amount?.amount),
  );

  const totalPlanBalance = (arr: any) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  };

  const basicSubData = totalPlanBalance(basicTotal);
  const standardSumTotal = totalPlanBalance(standardTotal);
  const premiumSumTotal = totalPlanBalance(premiumTotal);

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
            {formatCurrency(basicSubData)}
          </Typography>
        )}
        {standard && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(standardSumTotal)}
          </Typography>
        )}
        {premium && (
          <Typography color="background.paper" mt={2} fontWeight={600}>
            {formatCurrency(premiumSumTotal)}
          </Typography>
        )}

        <Divider color="white" sx={{ marginTop: `2rem` }} />
        <Typography color="background.paper" fontWeight={300} mt={2}>
          Number of guest #{data.numGuest}
        </Typography>

        <Box sx={{ width: `70%`, margin: `auto` }}>
          <Typography color="grey.300" fontWeight={300} mt={3}>
            Features
          </Typography>
          {basic && (
            <div>
              {data?.packages?.basic?.map((items: any, index: any) => (
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
                    {items.serviceName}
                  </Typography>
                </Box>
              ))}
            </div>
          )}
          {standard && (
            <div>
              {data?.packages?.basic?.map((items: any, index: any) => (
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
                    {items.serviceName}
                  </Typography>
                </Box>
              ))}
            </div>
          )}
          {premium && (
            <div>
              {data?.packages?.basic?.map((items: any, index: any) => (
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
                    {items.serviceName}
                  </Typography>
                </Box>
              ))}
            </div>
          )}
        </Box>
        <Box sx={{ textAlign: `center` }}>
          <CustomButton mt={4} lgWidth="100%" bgSecondary>
            Select
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

const VendorPricingCard = ({ amount, title, data }: any) => {
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
        {/* <Box sx={{ textAlign: `center` }} mt={1}>
          {data?.details?.role === `user` ? (
            <CustomButton mt={4} lgWidth="100%" bgSecondary>
              Select
            </CustomButton>
          ) : (
            <Link href="/account/gig">
              <CustomButton mt={4} lgWidth="100%" smWidth="100%" bgSecondary>
                Edit
              </CustomButton>
            </Link>
          )}
        </Box> */}
      </Box>
    </Box>
  );
};

export { PlannerCard, VendorPricingCard };
