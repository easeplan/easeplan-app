import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { styled } from '@mui/material/styles';
import { PlannerCard, VendorPricingCard } from '../PricingCard';
import EditPricingCardModal from './EditPricingCardModal';

const PricingCard = ({ queryData, token }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <Box>
      <EditPricingCardModal
        token={token}
        queryData={queryData}
        isOpen={openModal}
        isClose={() => setOpenModal(false)}
      />
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
              md: `1.4rem`,
              lg: `1.5rem`,
            },
          }}
        >
          Pricing
        </Typography>
        <EditButton onClick={handleOpenModal}>
          <CreateOutlinedIcon className="icon" />
        </EditButton>
      </Box>

      <Box mt={4}>
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
    </Box>
  );
};

const EditButton = styled(`button`)(({ theme }) => ({
  border: `none`,
  backgroundColor: `transparent`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
  textAlign: `center`,
  verticalAlign: `middle`,
  borderRadius: `50%`,
  color: theme.palette.primary.main,

  '&:hover': {
    color: theme.palette.secondary.main,
  },

  '.icon': {
    fontSize: `2rem`,
    marginLeft: `0.4rem`,
    marginBottom: `0.6rem`,
  },

  '@media (max-width: 900px)': {
    '.icon': {
      fontSize: `1.2rem`,
    },
  },
}));

export default PricingCard;
