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

const services = [
  {
    id: 1,
    title: `Catering`,
  },
  {
    id: 2,
    title: `Photographer`,
  },
  {
    id: 3,
    title: `MC`,
  },
  // {
  //   id: 5,
  //   title: `Make-up Artists`,
  // },
  // {
  //   id: 6,
  //   title: `Venue Manager`,
  // },
  {
    id: 7,
    title: `Decorator`,
  },
  {
    id: 8,
    title: `DJ's`,
  },
  {
    id: 9,
    title: `Security`,
  },
  {
    id: 10,
    title: `Videographer`,
  },
  {
    id: 11,
    title: `Print vendor`,
  },
  {
    id: 12,
    title: `Ushering`,
  },
  {
    id: 13,
    title: `Entertainer`,
  },
  {
    id: 14,
    title: `Live Band`,
  },
  {
    id: 15,
    title: `Hair Dresser`,
  },
  {
    id: 16,
    title: `Comedian`,
  },
  {
    id: 17,
    title: `Instrumentalist`,
  },
  {
    id: 18,
    title: `Sound Engineer`,
  },
  {
    id: 19,
    title: `Venue Vendor`,
  },
  {
    id: 20,
    title: `Tailor`,
  },
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

  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
    token,
  );

  console.log(data);

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
      <Layout handleSearchChange={handleSearchChange} data={queryData}>
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
                  <SwiperSlide key={service?.id}>
                    <Button
                      onClick={() => handleSetService(service?.title)}
                      sx={{
                        textWrap: `nowrap`,
                        fontWeight: `900`,
                        backgroundColor: `#fafafa`,
                        border: `solid 1px #fafafa`,
                        cursor: `pointer`,
                        color: `primary.main`,
                        textTransform: `capitalize`,
                        whiteSpace: `nowrap`,
                      }}
                    >
                      {service.title}
                    </Button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box mb={4} sx={{ display: `flex`, alignItems: `center` }}>
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
                    sm: `1fr`,
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
                {data?.length === 0 ? (
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
            {data?.length === 0 ? null : (
              <Box
                sx={{
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                  my: 6,
                }}
              >
                <Pagination
                  count={2}
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
