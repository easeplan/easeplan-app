import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { styled } from '@mui/material/styles';
import { PlannerCard, VendorPricingCard } from '../PricingCard';
import EditPlannerPriceModal from './EditPlannerForm/EditPremiumModal.tsx';
import EditVendorPriceModal from './EditVendorPriceModal';
import EditPremiumModal from './EditPlannerForm/EditPremiumModal.tsx';
import EditStandardModal from './EditPlannerForm/EditStandardModal.tsx';
import EditBasicModal from './EditPlannerForm/EditBasicModal.tsx';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useAuth } from '@/hooks/authContext';

const PricingCard = ({ queryData, token }: any) => {
  const { user } = useAuth();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = user?._id;
  const [openModal, setOpenModal] = useState(false);
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [openStandardModal, setOpenStandardModal] = useState(false);
  const [openPremiumModal, setOpenPremiumModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <Box>
      <Box
        sx={{
          mt: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            fontSize: {
              xs: '1.2rem',
              sm: '1.2rem',
              md: '1.4rem',
              lg: '1.5rem',
            },
          }}
          color="primary.main"
        >
          Pricing
        </Typography>
        <EditButton onClick={handleOpenModal}>
          <CreateOutlinedIcon className="icon" />
        </EditButton>
      </Box>

      <Box mt={4}>
        {/* {userInfo?.role === `planner` && (
          <>
            <EditBasicModal
              token={token}
              queryData={queryData}
              isOpen={openBasicModal}
              isClose={() => setOpenBasicModal(false)}
            />
            <EditStandardModal
              token={token}
              queryData={queryData}
              isOpen={openStandardModal}
              isClose={() => setOpenStandardModal(false)}
            />
            <EditPremiumModal
              token={token}
              queryData={queryData}
              isOpen={openPremiumModal}
              isClose={() => setOpenPremiumModal(false)}
            />

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
        )} */}
        <>
          <EditVendorPriceModal
            token={token}
            queryData={queryData}
            isOpen={openModal}
            isClose={() => setOpenModal(false)}
          />
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 4, md: 5 }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <VendorPricingCard
                title="Minimum Amount"
                amount={
                  queryData?.providerProfile?.budget
                    ? queryData?.providerProfile?.budget?.minimum
                    : '0.00'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <VendorPricingCard
                title="Maximum Amount"
                amount={
                  queryData?.providerProfile?.budget
                    ? queryData?.providerProfile?.budget?.maximum
                    : '0.00'
                }
              />
            </Grid>
          </Grid>
        </>
      </Box>
    </Box>
  );
};

const EditButton = styled('button')(({ theme }) => ({
  border: 'none',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  textAlign: 'center',
  verticalAlign: 'middle',
  borderRadius: '50%',
  color: theme.palette.primary.main,

  '&:hover': {
    color: theme.palette.secondary.main,
  },

  '.icon': {
    fontSize: '2rem',
    marginLeft: '0.4rem',
    marginBottom: '0.6rem',
  },

  '@media (max-width: 900px)': {
    '.icon': {
      fontSize: '1.2rem',
    },
  },
}));

export default PricingCard;
