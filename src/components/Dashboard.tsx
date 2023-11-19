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
import { Box, Typography } from '@mui/material';

const Dashboard = ({ data }: any) => {
  function filterOutAcceptedEvents(events: any) {
    let acceptedCount = 0;
    let completedCount = 0;

    for (const key in events) {
      const event = events[key];

      if (event.status === 'Accepted') {
        acceptedCount++;
      } else if (event.status === 'Completed') {
        completedCount++;
      }
    }

    return {
      accepted: acceptedCount,
      completed: completedCount,
    };
  }

  // const { accepted, completed } = filterOutAcceptedEvents(data?.events);

  return (
    <DashboardWrapper>
      <Typography
        fontWeight={700}
        my={2}
        color="primary.main"
        sx={{
          display: {
            xs: 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
            xl: 'none',
          },
          mt: 5,
        }}
      >
        🥰 Nice to have you here {data?.provider?.profile?.firstName}
      </Typography>
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
        <SwiperSlide>
          <Box
            className="linearGradient"
            sx={{
              boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
              px: 4,
              pb: 2,
              pt: 2,
              borderRadius: '1rem',
              position: 'relative',
              color: '#fff',
            }}
          >
            <Image src={Icon3} alt="EventIcon" height={40} width={40} />
            <Box sx={{ mt: '1rem' }}>
              <div className="cardFlex">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    sx={{ mr: 1, fontSize: '1.2rem' }}
                    fontWeight={800}
                  >
                    ₦
                  </Typography>

                  <Typography variant="h4" fontWeight={800}>
                    {data?.provider?.providerProfile?.balance === 0
                      ? '00.00'
                      : formatCurrency(
                          data?.provider?.providerProfile?.balance &&
                            data?.provider?.providerProfile?.balance,
                        )}
                  </Typography>
                </Box>
              </div>
              <small>Available Balance</small>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            className="linearGradient"
            sx={{
              boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
              px: 4,
              pb: 2,
              pt: 2,
              borderRadius: '1rem',
              position: 'relative',
              color: '#fff',
            }}
          >
            <Image src={Icon1} alt="EventIcon" height={40} width={40} />
            <Box sx={{ mt: '1rem' }}>
              <Typography variant="h4" fontWeight={800}>
                {data?.totalEvents}
              </Typography>
              <small>Number of events</small>
              {/* <h2 className="title">{completed}</h2> */}
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            className="linearGradient"
            sx={{
              boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
              px: {
                xs: 4,
                sm: 4,
                md: 6,
                lg: 6,
                xl: 6,
              },
              pb: 2,
              pt: 2,
              borderRadius: '1rem',
              position: 'relative',
              color: '#fff',
            }}
          >
            <Image src={Icon4} alt="EventIcon" height={40} width={40} />
            <Box sx={{ mt: '1rem' }}>
              {/* <h2 className="title">{accepted}</h2> */}
              <Typography variant="h4" fontWeight={800}>
                {data?.eventsInQueue}
              </Typography>
              <small>Event on Cue</small>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled('section')(({ theme }: any) => ({
  position: 'relative',
  height: '100%',
  marginTop: '1rem',
  color: theme.palette.primary.main,
  padding: '1.2rem 1rem 2rem 1.2rem',
  borderRadius: '10px',
  border: 'solid 1px gray',

  '.subTitle': {
    marginTop: '0.6rem',
  },
  '.greetTitle': {
    marginTop: '0.6rem',
    display: 'none',
  },

  '@media (max-width: 900px)': {
    marginTop: '0.5rem',

    border: 'none',
    padding: '0 0 0 1.2rem',
    boxShadow: 'none',

    '.head': {
      fontSize: '1rem',
      display: 'none',
    },
    '.subTitle': {
      marginTop: '0rem',
      display: 'none',
    },
    '.greetTitle': {
      marginTop: '0.6rem',
      fontSize: '1rem',
      display: 'block',
      textTransform: 'capitalize',
    },
  },
}));

const Card = styled('div')(({ theme }: any) => ({
  border: 'solid 1px #ccc',
  borderBottom: `solid 6px ${theme.palette.primary.main}`,
  padding: '1rem',
  width: '90%',
  borderRadius: '6px',
  color: theme.palette.primary.main,
  background: theme.palette.secondary.light,
  margin: '1rem 0 0 0',
  // height: `145px`,
  boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',

  '.title': {
    margin: '0',
  },

  '.cardFlex': {
    display: 'flex',
    alignItems: 'center',
  },

  '.shape': {
    position: 'absolute',
    top: '-4rem',
    right: '-4rem',

    '@media (max-width: 900px)': {
      top: '-6rem',
      right: '-5rem',
    },
  },

  small: {
    fontSize: '1rem',
    fontWeight: '600',
    marginRight: '0.1rem',
  },

  '@media (max-width: 900px)': {
    padding: '1rem',
    // height: `120px`,
    // display: `flex`,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)',
    '.title': {
      fontSize: '1.5rem',
    },
    p: {
      fontSize: '0.7rem',
    },
    small: {
      fontSize: '1rem',
    },

    img: {
      // width: `12%`,
      // height: `12%`,
    },
  },
}));

export default Dashboard;
