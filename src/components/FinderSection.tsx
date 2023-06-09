/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FinderIcon from '@/public/finder.gif';
import EventCenterIcon from '@/public/eventCenter.gif';
import VendorIcon from '@/public/vendor.gif';
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import FindPlannerModal from './FindPlannerModal';
import FindVendorModal from './FindVendorModal';
import SearchResultModal from './SearchResultModal';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenSearchModal } from '@/features/searchResultSlice';

const FinderSection = ({ queryData, token }: any) => {
  const dispatch = useDispatch();
  const { openSearchModal, data } = useSelector(
    (state: RootState) => state.searchModal,
  );
  const [openPlannerModal, setOpenPlannerModal] = useState(false);
  const [openVendorModal, setOpenVendorModal] = useState(false);

  const handleOpenFindPlannerModal = () => {
    setOpenPlannerModal(true);
  };

  const handleOpenFindVendorModal = () => {
    setOpenVendorModal(true);
  };

  return (
    <DashboardWrapper>
      <SearchResultModal
        openResult={openSearchModal}
        closeResult={() => dispatch(setOpenSearchModal(false))}
        queryData={data}
        token={token}
      />
      <h3 className="sectionTitle">Act Swiftly</h3>
      <FindPlannerModal
        isOpen={openPlannerModal}
        isClose={() => setOpenPlannerModal(false)}
        queryData={queryData}
        token={token}
      />
      <FindVendorModal
        isOpen={openVendorModal}
        isClose={() => setOpenVendorModal(false)}
        queryData={queryData}
        token={token}
      />
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 5 }}>
        <Grid item xs={6} sm={6} md={6}>
          <Card onClick={handleOpenFindPlannerModal}>
            <Image src={FinderIcon} alt="EventIcon" height={80} width={80} />
            <h3 className="title">Find Planner</h3>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Card onClick={handleOpenFindVendorModal}>
            <Image src={VendorIcon} alt="EventIcon" height={80} width={80} />
            <h3 className="title">Find Vendor</h3>
          </Card>
        </Grid>
      </Grid>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(`section`)(({ theme }) => ({
  position: `relative`,
  height: `100%`,
  marginTop: `2rem`,
  color: theme.palette.primary.main,

  '.sectionTitle': {
    marginTop: `0.6rem`,
    borderBottom: `solid 0.5px #ccc`,
    paddingBottom: `0.5rem`,
  },

  '@media (max-width: 900px)': {
    marginTop: `1rem`,
  },
}));

const Card = styled(`div`)(({ theme }) => ({
  borderBottom: `solid 1rem ${theme.palette.secondary.main}`,
  padding: `2rem`,
  width: `100%`,
  color: theme.palette.secondary.main,
  background: theme.palette.primary.main,
  marginTop: `1.3rem`,
  textAlign: `center`,
  cursor: `pointer`,
  transition: `all 0.5s ease`,
  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
  borderRadius: `10px`,

  '&:hover': {
    background: theme.palette.primary.light,
  },

  '&:hover .title': {
    transition: `all 0.5s ease`,
    transform: `scale(1.3)`,
  },

  '.title': {
    margin: `0.3rem 0`,
    transition: `all 0.5s ease`,
  },

  '@media (max-width: 900px)': {
    padding: `0.5rem`,

    '.title': {
      margin: `0 0 0.5rem 0`,
      fontSize: `0.8rem`,
    },
  },
}));

export default FinderSection;
