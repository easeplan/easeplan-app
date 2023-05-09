import DashboardLayout from '@/components/DashboardLayout';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Box from '@mui/material/Box';
import PricingEventForm from '@/components/PricingEventForm';
import VendorPricingForm from '@/components/VendorPricingForm';
import { useAuthUser } from '@/context/contextStore';
import LoadingScreen from '@/components/common/LoadingScreen';
import useFetch from '@/hooks/useFetch';
export { getServerSideProps } from '@/context/contextStore';

const PricingPage = ({ token }: any) => {
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
      <Box sx={{ width: `100%`, mt: 3 }}>
        <Flex>
          <Link href="/dashboard/gig">
            <h3 className="title active">Packages</h3>
          </Link>
          <Link href="/dashboard/gig/event">
            <h3 className="title">Previous Event</h3>
          </Link>
        </Flex>
        {queryData?.details?.role === `vendor` && (
          <VendorPricingForm token={token} />
        )}
        {queryData?.details?.role === `planner` && (
          <PricingEventForm token={token} />
        )}
      </Box>
    </DashboardLayout>
  );
};

const Flex = styled(`div`)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  marginTop: `2rem`,
  color: theme.palette.primary.main,

  '.title': {
    marginRight: `2rem`,
  },
  '.active': {
    color: theme.palette.secondary.main,
  },

  '@media (max-width: 900px)': {},
}));

export default PricingPage;
