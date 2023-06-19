/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import Icon1 from '@/public/svgs/Icon.svg';
import Icon2 from '@/public/svgs/Icon(1).svg';
import Icon3 from '@/public/svgs/Icon(2).svg';
import Icon4 from '@/public/svgs/Icon(3).svg';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const Dashboard = ({ data }: any) => {
  return (
    <DashboardWrapper>
      <h3 className="head">Today’s Summary</h3>
      <h3 className="greetTitle">Welcome, {data?.firstName}</h3>
      <p className="subTitle">Activities</p>

      <Swiper
        slidesPerView={1.3}
        spaceBetween={30}
        breakpoints={{
          640: {
            spaceBetween: 30,
            slidesPerView: 1.3,
          },
          768: {
            spaceBetween: 30,
            slidesPerView: 1.3,
          },
          1024: {
            spaceBetween: 30,
            slidesPerView: 4,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card>
            <Image src={Icon2} alt="EventIcon" height={40} width={40} />
            <div>
              <div className="cardFlex">
                <small>NGN</small>
                <h2 className="title">00.00</h2>
              </div>
              <p>Total Amount Made</p>
            </div>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <Image src={Icon1} alt="EventIcon" height={40} width={40} />
            <div>
              <h2 className="title">0</h2>
              <p>Number of events</p>
            </div>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <Image src={Icon3} alt="EventIcon" height={40} width={40} />
            <div>
              <div className="cardFlex">
                <small>NGN</small>
                <h2 className="title">00.00</h2>
              </div>
              <p>Available Balance</p>
            </div>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <Image src={Icon4} alt="EventIcon" height={40} width={40} />
            <div>
              <h2 className="title">0</h2>
              <p>Even on Cue</p>
            </div>
          </Card>
        </SwiperSlide>
      </Swiper>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(`section`)(({ theme }: any) => ({
  position: `relative`,
  height: `100%`,
  marginTop: `1rem`,
  color: theme.palette.primary.main,
  padding: `1.2rem 1rem 2rem 1.2rem`,
  borderRadius: `10px`,

  '.subTitle': {
    marginTop: `0.6rem`,
  },
  '.greetTitle': {
    marginTop: `0.6rem`,
    display: `none`,
  },

  '@media (max-width: 900px)': {
    marginTop: `0.5rem`,

    border: `none`,
    padding: `0 0 0 1.2rem`,
    boxShadow: `none`,

    '.head': {
      fontSize: `1rem`,
      display: `none`,
    },
    '.subTitle': {
      marginTop: `0rem`,
      display: `none`,
    },
    '.greetTitle': {
      marginTop: `0.6rem`,
      fontSize: `1rem`,
      display: `block`,
      textTransform: `capitalize`,
    },
  },
}));

const Card = styled(`div`)(({ theme }: any) => ({
  border: `solid 1px #ccc`,
  borderBottom: `solid 6px ${theme.palette.primary.main}`,
  padding: `1rem`,
  width: `90%`,
  borderRadius: `6px`,
  color: theme.palette.primary.main,
  background: theme.palette.common.light,
  margin: `1rem 0 0 0`,
  height: `145px`,
  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,

  '.title': {
    margin: `0`,
  },

  '.cardFlex': {
    display: `flex`,
    alignItems: `center`,
  },

  small: {
    fontSize: `1rem`,
    fontWeight: `600`,
    marginRight: `0.1rem`,
  },

  '@media (max-width: 900px)': {
    padding: `1rem`,
    height: `120px`,
    display: `flex`,
    flexDirection: `row-reverse`,
    alignItems: `center`,
    justifyContent: `space-between`,
    boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
    '.title': {
      fontSize: `1.5rem`,
    },
    p: {
      fontSize: `0.7rem`,
    },
    small: {
      fontSize: `1rem`,
    },

    img: {
      // width: `12%`,
      // height: `12%`,
    },
  },
}));

export default Dashboard;
