import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PlannerCard, VendorPricingCard } from './ServiceCard';

const PricingSection = ({ queryData }: any) => {
  const [setOpenBasicModal] = useState(false);
  const [setOpenStandardModal] = useState(false);
  const [setOpenPremiumModal] = useState(false);
  return (
    <Box my={10}>
      <Box
        sx={{
          mt: `2rem`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
        }}
      >
        <Typography
          fontWeight={600}
          sx={{
            fontSize: {
              xs: `1.2rem`,
              sm: `1.2rem`,
              md: `1.5rem`,
              lg: `2rem`,
            },
          }}
        >
          Pricing Plan
        </Typography>
      </Box>

      <Box mt={4}>
        {queryData?.role === `planner` && (
          <>
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 4, md: 5 }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <PlannerCard
                  basic={true}
                  setOpenBasicModal={setOpenBasicModal}
                  data={queryData}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <PlannerCard
                  standard={true}
                  setOpenStandardModal={setOpenStandardModal}
                  data={queryData}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <PlannerCard
                  premium
                  setOpenPremiumModal={setOpenPremiumModal}
                  data={queryData}
                />
              </Grid>
            </Grid>
          </>
        )}
        {` `}
        {queryData?.role === `provider` && (
          <>
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 4, md: 5 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <VendorPricingCard
                  title="Minimum Amount"
                  amount={
                    queryData?.data?.budget
                      ? queryData?.data?.budget?.minimum
                      : `0.00`
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <VendorPricingCard
                  title="Maximum Amount"
                  amount={
                    queryData?.data?.budget
                      ? queryData?.data?.budget?.maximum
                      : `0.00`
                  }
                />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PricingSection;
