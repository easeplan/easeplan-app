import DashboardLayout from '@/components/DashboardLayout';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import UserRating from '@/components/common/UserRating';
import CustomButton from '@/components/common/CustomButton';
import { VendorPricingCard, PlannerCard } from '@/components/PricingCard';
import PreviousEventSlider from '@/components/PreviousEventSlider';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
export { getServerSideProps } from '@/context/contextStore';

const PreviewPage = ({ token }: any) => {
  const { queryData, error, isLoading } = useFetch(
    `/providers/profile`,
    `${token}`,
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error:</p>;
  }

  return (
    <DashboardLayout token={token}>
      <Typography mt={8} variant="h5">
        {queryData?.company?.name}
      </Typography>
      <Box
        mt={2}
        sx={{
          display: `flex`,
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `column`,
            lg: `row`,
          },
          gap: `3rem`,
        }}
      >
        <Box
          sx={{
            width: {
              xs: `100%`,
              sm: `100%`,
              lg: `70%`,
            },
          }}
        >
          <Box
            sx={{
              width: `100%`,
              height: {
                xs: `200px`,
                sm: `200px`,
                lg: `200px`,
              },
              position: `relative`,
            }}
          >
            <Image
              src={queryData?.company?.image}
              alt="bannerImage"
              fill
              style={{
                width: `100%`,
                objectFit: `cover`,
              }}
            />
          </Box>
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              textTransform: `capitalize`,
            }}
            mt={1}
          >
            <Typography variant="h6" mr={2}>
              {queryData?.details?.firstname} {``}
              {queryData?.details?.lastname}
            </Typography>
            {queryData?.rating && <UserRating rate={queryData?.rating} />}
          </Box>
          <Box mt={6}>
            <Typography variant="h5" fontWeight={500}>
              About this company
            </Typography>
            <Typography mt={2}>{queryData?.company?.description}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: `100%`,
              sm: `100%`,
              lg: `30%`,
            },
          }}
        >
          <Box
            p={3}
            sx={{
              border: `solid 1px #ccc`,
            }}
          >
            <Typography variant="h5" fontWeight={500}>
              About {queryData?.details?.role}
            </Typography>
            <Box
              width={80}
              height={80}
              style={{
                borderRadius: `50%`,
                position: `relative`,
                margin: `2rem auto`,
              }}
            >
              <Image
                src={queryData?.picture}
                alt="profileImage"
                fill
                style={{ borderRadius: `50%` }}
              />
            </Box>
            <Box sx={{ textAlign: `center` }}>
              <Typography variant="h6" mr={2}>
                {queryData?.details?.firstname} {` `}
                {queryData?.details?.lastname}
              </Typography>
              {/* <UserRating size="small" fontSize="0.8rem" /> */}
            </Box>
            {/* <Box
              mt={8}
              sx={{
                display: `flex`,
                justifyContent: `space-between`,
                flexDirection: {
                  xs: `row`,
                  sm: `row`,
                  md: `row`,
                  lg: `row`,
                },
              }}
            >
              <Box>
                <Typography>From</Typography>
                <Typography fontWeight="bold">Nigeria</Typography>
              </Box>
              <Box>
                <Typography>Location</Typography>
                <Typography fontWeight="bold">Port Harcourt</Typography>
              </Box>
              <Box>
                <Typography>Joined</Typography>
                <Typography fontWeight="bold">Sep 2023</Typography>
              </Box>
            </Box> */}
          </Box>
          {queryData?.details?.role === `user` && (
            <Box
              p={3}
              mt={4}
              sx={{
                border: `solid 1px #ccc`,
              }}
            >
              <Typography variant="h6" mb={1}>
                Message planner
              </Typography>
              <Typography mb={4}>Contact planner for custom orders</Typography>
              <Box textAlign="center">
                <CustomButton bgPrimary>Contact planner</CustomButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box mt={9}>
        {queryData?.details?.role === `planner` && (
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 4, md: 5 }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <PlannerCard basic={true} data={queryData} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PlannerCard standard={true} data={queryData} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PlannerCard premium data={queryData} />
            </Grid>
          </Grid>
        )}
        {` `}
        {queryData?.details?.role === `vendor` && (
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 4, md: 5 }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <VendorPricingCard
                title="Minimum Amount"
                data={queryData}
                amount={queryData?.budget?.minimum}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <VendorPricingCard
                data={queryData}
                title="Maximum Amount"
                amount={queryData?.budget?.maximum}
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <PreviousEventSlider samplesData={queryData?.samples} />
    </DashboardLayout>
  );
};

export default PreviewPage;
