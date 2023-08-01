/* eslint-disable @typescript-eslint/no-use-before-define */
import { styled } from '@mui/material/styles';
import Icon1 from '@/public/svgs/Icon.svg';
import Icon2 from '@/public/svgs/Icon(1).svg';
import Icon3 from '@/public/svgs/Icon(2).svg';
import Icon4 from '@/public/svgs/Icon(3).svg';
import Icon6 from '@/public/graph.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatCurrency } from '@/utils';
import 'swiper/css';
import 'swiper/css/pagination';

const Dashboard = ({ data }: any) => {
  function filterOutAcceptedEvents(events: any) {
    let acceptedCount = 0;
    let completedCount = 0;

    for (const key in events) {
      const event = events[key];

      if (event.status === `Accepted`) {
        acceptedCount++;
      } else if (event.status === `Completed`) {
        completedCount++;
      }
    }

    return {
      accepted: acceptedCount,
      completed: completedCount,
    };
  }

  const { accepted, completed } = filterOutAcceptedEvents(data.events);

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
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <Card>
            <Image src={Icon2} alt="EventIcon" height={40} width={40} />
            <div>
              <div className="cardFlex">
                <small>₦</small>
                <h2 className="title">{data?.balance === 0
              ? `0.00`
                    : formatCurrency(data?.balance && data?.balance)}
                </h2>
              </div>
              <p>Total Amount Made</p>
            </div>
            <Image
              src={Icon6}
              alt="EventIcon"
              className="shape"
              height={200}
              width={200}
            />
          </Card>
        </SwiperSlide> */}
        <SwiperSlide>
          <Card>
            <Image src={Icon3} alt="EventIcon" height={40} width={40} />
            <div>
              <div className="cardFlex">
                <small>₦</small>
                <h2 className="title">
                  {data?.balance === 0
                    ? `0.00`
                    : formatCurrency(data?.balance && data?.balance)}
                </h2>
              </div>
              <p>Available Balance</p>
            </div>
            <Image
              src={Icon6}
              alt="EventIcon"
              className="shape"
              height={200}
              width={200}
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <Image src={Icon1} alt="EventIcon" height={40} width={40} />
            <div>
              <h2 className="title">{completed}</h2>
              <p>Number of events</p>
            </div>
            <Image
              src={Icon6}
              alt="EventIcon"
              className="shape"
              height={200}
              width={200}
            />
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <Image src={Icon4} alt="EventIcon" height={40} width={40} />
            <div>
              <h2 className="title">{accepted}</h2>
              <p>Event on Cue</p>
            </div>
            <Image
              src={Icon6}
              alt="EventIcon"
              className="shape"
              height={200}
              width={200}
            />
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
  background: theme.palette.secondary.light,
  margin: `1rem 0 0 0`,
  // height: `145px`,
  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
  position: `relative`,
  overflow: `hidden`,

  '.title': {
    margin: `0`,
  },

  '.cardFlex': {
    display: `flex`,
    alignItems: `center`,
  },

  '.shape': {
    position: `absolute`,
    top: `-4rem`,
    right: `-4rem`,

    '@media (max-width: 900px)': {
      top: `-6rem`,
      right: `-5rem`,
    },
  },

  small: {
    fontSize: `1rem`,
    fontWeight: `600`,
    marginRight: `0.1rem`,
  },

  '@media (max-width: 900px)': {
    padding: `1rem`,
    // height: `120px`,
    // display: `flex`,
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
