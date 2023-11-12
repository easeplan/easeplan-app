import theme from '@/styles/theme';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import CustomButton from './common/CustomButton';
import { formatCurrency } from '@/utils';

// Planner Price Card
const PlannerCard = ({
  basic,
  standard,
  premium,
  setOpenPremiumModal,
  setOpenStandardModal,
  setOpenBasicModal,
  data,
}: any) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
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
                  onClick={() => setOpenBasicModal(true)}
                  bgSecondary
                >
                  Add Services
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
                  onClick={() => setOpenStandardModal(true)}
                  bgSecondary
                >
                  Add Services
                </CustomButton>
              </Box>
            </div>
          )}
          {premium && (
            <div>
              {data?.package?.premium?.service?.map(
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
                      textTransform="capitalize"
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
                  onClick={() => setOpenPremiumModal(true)}
                  bgSecondary
                >
                  Add Services
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
        // backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box p={4}>
        <Typography
          color="primary.main"
          sx={{ fontWeight: '700', fontSize: '1rem' }}
        >
          {title}
        </Typography>
        <Typography
          color="primary.main"
          mt={2}
          fontWeight={800}
          sx={{ fontSize: '2rem' }}
        >
          <small>₦</small> {formatCurrency(amount)}
        </Typography>
      </Box>
    </Box>
  );
};

export { PlannerCard, VendorPricingCard };
