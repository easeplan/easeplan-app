import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PlannerCard, VendorPricingCard } from './ServiceCard';

const PricingSection = ({ queryData, token }: any) => {
  return (
    <Box mb={5} id="pricingSection">
      <Box>
        {queryData?.role === `planner` && (
          <>
            <Box
              mb={4}
              sx={{
                mt: `2rem`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
              }}
            >
              <Typography
                fontWeight={800}
                color="primary.main"
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
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 4, md: 5 }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <PlannerCard basic={true} token={token} data={queryData} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <PlannerCard standard={true} token={token} data={queryData} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <PlannerCard token={token} premium data={queryData} />
              </Grid>
            </Grid>
          </>
        )}
        {` `}
        {/* {queryData?.role === `provider` && (
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
        )} */}
      </Box>
    </Box>
  );
};

export default PricingSection;
