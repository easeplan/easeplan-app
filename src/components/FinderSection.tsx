/* eslint-disable @typescript-eslint/no-use-before-define */
// import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import FinderIcon from '@/public/finder.gif';
import EventCenterIcon from '@/public/eventCenter.gif';
import VendorIcon from '@/public/vendor.gif';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

const FinderSection = () => {
  return (
    <DashboardWrapper>
      <h3 className="sectionTitle">Act Swiftly</h3>

      <Swiper
        slidesPerView={2.4}
        spaceBetween={10}
        breakpoints={{
          640: {
            spaceBetween: 10,
            slidesPerView: 2.3,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 2.3,
          },
          1024: {
            spaceBetween: 40,
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card>
            <Image src={FinderIcon} alt="EventIcon" height={50} width={50} />
            <h3 className="title">Find Planner</h3>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <Image src={VendorIcon} alt="EventIcon" height={50} width={50} />
            <h3 className="title">Find Vendor</h3>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <Image
              src={EventCenterIcon}
              alt="EventIcon"
              height={50}
              width={50}
            />
            <h3 className="title">Find Event Center</h3>
          </Card>
        </SwiperSlide>
      </Swiper>
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
  border: `solid 1px #ccc`,
  padding: `2rem`,
  width: `100%`,
  color: theme.palette.primary.main,
  background: theme.palette.background.default,
  marginTop: `1.3rem`,
  textAlign: `center`,
  cursor: `pointer`,
  transition: `all 0.5s ease`,

  '&:hover': {
    background: theme.palette.secondary.light,
  },

  '.title': {
    margin: `0.5rem 0`,
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
