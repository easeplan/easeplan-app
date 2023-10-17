import CardList from '@/components/vendors/CardList';
import Layout from '@/components/vendors/Layout';
import { Box, Button, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useFetchVendors } from '@/hooks/useFetchVendors';
import Header from '@/components/vendors/Header';
import { useSearch } from '@/hooks/useSearch';
import useSearchServices from '@/hooks/useSearchServices';
import useLocation from '@/hooks/useLocation';

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
  {
    id: 5,
    title: `Make-up Artists`,
  },
  {
    id: 6,
    title: `Venue Manager`,
  },
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

const VendorPage = () => {
  const { currentCity, currentState, error } = useLocation();
  const [page, setPage] = useState(1);
  const [state, setState] = useState(``);
  const [city, setCity] = useState(``);
  const [budget, setBudget] = useState(``);
  // console.log(`state:`, currentCity);

  const { search, handleSearchChange } = useSearch();
  const { service, handleSetService } = useSearchServices();
  const { data } = useFetchVendors(
    page,
    search,
    currentState,
    currentCity,
    budget,
    service,
  );

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <Layout handleSearchChange={handleSearchChange}>
      <Box
        sx={{
          pt: {
            xs: 4,
            sm: 4,
            md: 4,
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
        <Box sx={{ mt: 4 }}>
          <Box>
            <Swiper
              slidesPerView={3}
              spaceBetween={50}
              breakpoints={{
                640: {
                  spaceBetween: 30,
                  slidesPerView: 8.8,
                },
                768: {
                  spaceBetween: 2,
                  slidesPerView: 8.6,
                },
                1024: {
                  spaceBetween: 2,
                  slidesPerView: 10,
                },
              }}
              className="mySwiper"
            >
              {services.map((service) => (
                <SwiperSlide key={service?.id}>
                  <Button
                    onClick={() => handleSetService(service?.title)}
                    variant="text"
                    sx={{
                      textWrap: `nowrap`,
                      fontWeight: `900`,
                      cursor: `pointer`,
                      color: `primary.main`,
                      textTransform: `capitalize`,
                    }}
                  >
                    {service.title}
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          {/* <Box sx={{ display: `flex`, gap: `2rem`, overflow: `hidden` }}>
            {services?.map((service) => (
              <Box key={service?.id}>
                <Button
                  onClick={() => handleSetService(service?.title)}
                  variant="text"
                  sx={{
                    textWrap: `nowrap`,
                    fontWeight: `900`,
                    cursor: `pointer`,
                    color: `primary.main`,
                  }}
                >
                  {service.title}
                </Button>
              </Box>
            ))}
          </Box> */}
          <CardList data={data} />
          <Box
            sx={{
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
              my: 6,
            }}
          >
            <Pagination
              count={5}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default VendorPage;
