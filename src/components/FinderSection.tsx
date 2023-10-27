/* eslint-disable @typescript-eslint/no-use-before-define */
// import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
// import FinderIcon from '@/public/finder.gif';
// import EventCenterIcon from '@/public/eventCenter.gif';
// import VendorIcon from '@/public/vendor.gif';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import FindPlannerModal from './FindPlannerModal';
import FindVendorModal from './FindVendorModal';
import FindVendorForm from './FindVendorForm';
import SearchResultModal from './SearchResultModal';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOpenSearchModal,
  setOpenPlannerModal,
  setOpenVendorModal,
} from '@/features/searchResultSlice';
import bannerImg from '@/public/banner.png';
import EventList from './EventList';
import { toast } from 'react-toastify';

const FinderSection = ({ queryData, token }: any) => {
  const dispatch = useDispatch();
  const { openSearchModal, openPlannerModal, openVendorModal, data } =
    useSelector((state: RootState) => state.searchModal);

  // const handleOpenFindPlannerModal = () => {
  //   toast.success(`This feature will be available on the 1st of August 🥰`);
  //   dispatch(setOpenPlannerModal(true));
  // };

  // const handleOpenFindVendorModal = () => {
  //   toast.success(`This feature will be available on the 1st of August 🥰`);
  //   dispatch(setOpenVendorModal(true));
  // };

  return (
    <>
      {/* <Box
        sx={{
          width: `100%`,
          height: `100%`,
          position: `relative`,
          marginTop: {
            xs: `2rem`,
          },
          img: { width: `100%`, height: `100%` },
        }}
      >
        <Image
          src={bannerImg}
          alt="img"
          height={100}
          width={1200}
          loading="lazy"
        />
      </Box> */}

      <DashboardWrapper>
        <SearchResultModal
          openResult={openSearchModal}
          closeResult={() => dispatch(setOpenSearchModal(false))}
          queryData={data}
          token={token}
        />
        {/* <h3 className="sectionTitle">Act Swiftly</h3> */}
        {/* <FindPlannerModal
          isOpen={openPlannerModal}
          isClose={() => dispatch(setOpenPlannerModal(false))}
          queryData={queryData}
          token={token}
        /> */}
        <FindVendorModal
          isOpen={openVendorModal}
          isClose={() => dispatch(setOpenVendorModal(false))}
          queryData={queryData}
          token={token}
        />
        {/* <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 5 }}>
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
        </Grid> */}
        <Box mt={8}>
          <Typography
            sx={{
              textAlign: `center`,
              fontSize: { xs: `1.5rem`, sm: `1.5rem`, lg: `2rem` },
            }}
          >
            Hello {queryData?.data?.profile?.firstName}, Let`s help you find a
            vendor for your event
          </Typography>
          <FindVendorForm queryData={queryData} token={token} />
        </Box>
        {/* <Box sx={{ mt: 10 }}>
          <EventList />
        </Box> */}
      </DashboardWrapper>
    </>
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

// const Card = styled(`div`)(({ theme }) => ({
//   borderBottom: `solid 1rem ${theme.palette.secondary.main}`,
//   padding: `2rem`,
//   width: `100%`,
//   color: theme.palette.secondary.main,
//   background: theme.palette.primary.main,
//   marginTop: `1.3rem`,
//   textAlign: `center`,
//   cursor: `pointer`,
//   transition: `all 0.5s ease`,
//   boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
//   borderRadius: `10px`,

//   '&:hover': {
//     background: theme.palette.primary.light,
//   },

//   '&:hover .title': {
//     transition: `all 0.5s ease`,
//     transform: `scale(1.3)`,
//   },

//   '.title': {
//     margin: `0.3rem 0`,
//     transition: `all 0.5s ease`,
//   },

//   '@media (max-width: 900px)': {
//     padding: `0.5rem`,

//     '.title': {
//       margin: `0 0 0.5rem 0`,
//       fontSize: `0.8rem`,
//     },
//   },
// }));

export default FinderSection;
