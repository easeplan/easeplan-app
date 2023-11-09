import CardList from '@/components/vendors/CardList';
import Layout from '@/components/vendors/Layout';
import {
  Box,
  Button,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useFetchVendors } from '@/hooks/useFetchVendors';
import { useSearch } from '@/hooks/useSearch';
import useSearchServices from '@/hooks/useSearchServices';
import Head from 'next/head';
import 'swiper/css/navigation';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Image from 'next/image';
// import { useGetCurrentUserQuery } from '@/features/usersApiSlice';
export { getServerSideProps } from '@/hooks/useFetchToken';
import cateringIcon from '@/public/event-icons/catering.png';
import cakeIcon from '@/public/event-icons/cake.png';
import decorationIcon from '@/public/event-icons/decoration.png';
import mcIcon from '@/public/event-icons/mc.png';
import photograherIcon from '@/public/event-icons/photographer.png';
import videograherIcon from '@/public/event-icons/photographer (1).png';
import securityIcon from '@/public/event-icons/security-agent.png';
import userIcon from '@/public/event-icons/usher.png';
import djIcon from '@/public/event-icons/dj.png';
import comedianIcon from '@/public/event-icons/comedian.png';
import entertainerIcon from '@/public/event-icons/dancer.png';
import hairStylistIcon from '@/public/event-icons/hair-dye.png';
import makeUpIcon from '@/public/event-icons/make-up.png';
import liveBandicon from '@/public/event-icons/live-music.png';

const services = [
  {
    id: 1,
    title: `Catering`,
    icon: cateringIcon,
  },
  {
    id: 2,
    title: `Photographer`,
    icon: photograherIcon,
  },
  {
    id: 3,
    title: `Baker`,
    icon: cakeIcon,
  },
  {
    id: 4,
    title: `MC`,
    icon: mcIcon,
  },
  {
    id: 5,
    title: `Make-up Artists`,
    icon: makeUpIcon,
  },
  // {
  //   id: 6,
  //   title: `Venue Manager`,
  // },
  {
    id: 7,
    title: `Decorator`,
    icon: decorationIcon,
  },
  {
    id: 8,
    title: `DJ's`,
    icon: djIcon,
  },
  {
    id: 9,
    title: `Security`,
    icon: securityIcon,
  },
  {
    id: 10,
    title: `Videographer`,
    icon: videograherIcon,
  },
  // {
  //   id: 11,
  //   title: `Print vendor`,
  //   icon: userIcon
  // },
  {
    id: 12,
    title: `Ushering`,
    icon: userIcon,
  },
  {
    id: 13,
    title: `Entertainer`,
    icon: entertainerIcon,
  },
  {
    id: 14,
    title: `Live Band`,
    icon: liveBandicon,
  },
  {
    id: 15,
    title: `Hair Dresser`,
    icon: hairStylistIcon,
  },
  {
    id: 16,
    title: `Comedian`,
    icon: comedianIcon,
  },
  // {
  //   id: 17,
  //   title: `Instrumentalist`,
  // },
  // {
  //   id: 18,
  //   title: `Sound Engineer`,
  // },
  // {
  //   id: 19,
  //   title: `Venue Vendor`,
  // },
  // {
  //   id: 20,
  //   title: `Tailor`,
  // },
];

interface Props {
  token: string;
}

const VendorPage = ({ token }: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(1);
  const [state, setState] = useState(``);
  const [city, setCity] = useState(``);
  const [budget, setBudget] = useState(``);

  const { search, handleSearchChange } = useSearch();
  const { service, handleSetService, handleClearService } = useSearchServices();
  const { data, loading } = useFetchVendors(
    page,
    search,
    state,
    city,
    budget,
    service,
  );
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const { queryData } = useFetch(`/profiles/${userInfo}`, token);
  // const { isFetching, data: userData, error } = useGetCurrentUserQuery({ id });
  const dataObj = data as any;
  return (
    <>
      <Head>
        <title>
          EasePlan || Find event vendors near you in Lagos, Abuja, Port
          Harcourt, Delta, Ibadan, Calabar, Enugu, Abia, Owerri
        </title>
        <meta
          name="description"
          content="Make event planning a breeze with Easeplan. Find the best service providers, connect with top event planners and vendors near you, and manage everything in one easy-to-use platform in Lagos, Abuja, Port
          Harcourt, Delta, Ibadan, Calabar, Enugu, Abia, Owerri"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="keyword"
          content="Find event vendors near your such as, Find near you, Find vendors, Event vendors near me, vendors near me, Catering, Photographer, MC, Make-up Artist, Venue manager, Event decorator, Transportation coordinator, Security personnel, Videographer, Print vendor, Ushering, Entertainer, Tailor, Venue Vendor, Sound Engineer, Instrumentalist, Comedian, Hair Dresser, Live Band"
        />
      </Head>
      <Layout
        isSearch
        handleSearchChange={handleSearchChange}
        data={queryData?.provider}
      >
        <Box
          sx={{
            pt: {
              xs: 0,
              sm: 0,
              md: 0,
              lg: 10,
              xl: 10,
            },
            px: {
              xs: 4,
              sm: 4,
              md: 4,
              lg: 10,
              xl: 10,
            },
          }}
        >
          <Box
            sx={{
              mt: 2,
              mb: 10,
            }}
          >
            <Box my={4}>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                  640: {
                    spaceBetween: 6,
                    slidesPerView: 10,
                  },
                  768: {
                    spaceBetween: 4,
                    slidesPerView: 8.8,
                  },
                  1024: {
                    spaceBetween: 2,
                    slidesPerView: 8.8,
                  },
                }}
              >
                {services.map((service) => (
                  <SwiperSlide
                    key={service.id}
                    style={{ display: `flex`, justifyContent: `center` }}
                  >
                    <Button
                      onClick={() => handleSetService(service.title)}
                      sx={{
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `center`,
                        textWrap: `nowrap`,
                        fontWeight: `500`,
                        // border: `solid 1px #fafafa`,
                        cursor: `pointer`,
                        color: `primary.main`,
                        textTransform: `capitalize`,
                        whiteSpace: `nowrap`,
                        margin: `0.4px`,
                        padding: `8px`,
                        '&:hover': {
                          backgroundColor: `#f0f0f0`,
                        },
                      }}
                    >
                    <Box
  sx={{
    mb: `4px`,
    width: { xs: '35px', sm: '40px' }, // Are you sure you want '40rem'? That's extremely large. Maybe '40px'?
    height: { xs: '35px' }, // Same here, '40rem' is quite large, '40px' might be what you need
    display: 'inline-block',
    overflow: 'hidden',
    position: 'relative',
    '& img': {
      objectFit: 'cover',
      width: '100% !important',
      height: '100% !important',
      position: 'absolute',
    },
  }}
>
  <Image
    src={service?.icon}
    alt={`${service.title} icon`}
    objectFit="contain" 
    layout="fill"// This may be necessary if you want to enforce the dimensions, remove if you are using responsive dimensions
  />
</Box>
                      {service.title}
                    </Button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box mb={2} sx={{ display: `flex`, alignItems: `center` }}>
              {service ? (
                <Button sx={{ fontWeight: `600` }} onClick={handleClearService}>
                  Previous /
                </Button>
              ) : null}
              <Typography
                sx={{ fontSize: `1rem` }}
                fontWeight="900"
                color="primary.main"
              >
                All {service ? service : `Categories`}
              </Typography>
            </Box>
            {loading ? (
              <Box
                py={10}
                sx={{
                  display: `grid`,
                  gridTemplateColumns: {
                    xs: `1fr`,
                    sm: `1fr 1fr`,
                    md: `1fr 1fr 1fr`,
                    lg: `1fr 1fr 1fr 1fr`,
                    xl: `1fr 1fr 1fr 1fr`,
                  },
                  gap: `2rem`,
                }}
              >
                {[2, 3, 4, 5, 6, 0, 10, 12].map((i) => (
                  <Stack spacing={1} key={i}>
                    <Skeleton variant="text" sx={{ fontSize: `1rem` }} />

                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                  </Stack>
                ))}
              </Box>
            ) : (
              <>
                {dataObj?.data?.length === 0 ? (
                  <Box sx={{ textAlign: `center`, mt: 20, mb: 10 }}>
                    <HourglassEmptyIcon />
                    <Typography fontWeight={900} color="primary.main">
                      {service} is not available
                    </Typography>
                  </Box>
                ) : (
                  <CardList data={data} />
                )}
              </>
            )}
            {dataObj?.data?.length === 0 ? null : (
              <Box
                sx={{
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                  my: 6,
                }}
              >
                <Pagination
                  style={{ marginBottom: `0.7rem` }}
                  count={dataObj?.totalPages}
                  color="primary"
                  page={page}
                  onChange={handleChange}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default VendorPage;
