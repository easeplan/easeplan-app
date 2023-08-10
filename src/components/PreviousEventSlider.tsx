import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CustomButton from './common/CustomButton';
import Link from 'next/link';

interface SlideProps {
  samplesData: any;
}

const PreviousEventSlider = ({ samplesData }: SlideProps) => {
  return (
    <>
      <Box mt={4} mb={2}>
        <Typography mt={8} variant="h6" fontWeight={600}>
          Previous events
        </Typography>
      </Box>
      {samplesData.map((slide: any) => (
        <Box
          key={slide._id}
          sx={{
            width: {
              xs: `100%`,
              sm: `100%`,
              md: `80%`,
              lg: `80%`,
              xl: `80%`,
            },
            height: `200px`,
            position: `relative`,
          }}
        >
          <Image src={slide?.image} alt="EventIcon" fill quality={100} />
          <div className="previousEventGradient">
            <Box
              sx={{
                width: `100%`,
                display: `flex`,
                alignItems: `end`,
                justifyContent: `start`,
              }}
            >
              <Box p={3}>
                <Typography color="common.white" fontSize={23} fontWeight={500}>
                  {slide.title}
                </Typography>
                <Typography color="grey.300" fontWeight={300}>
                  {slide.subTitle}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>
      ))}
      <Link href="/account/gig/event">
        <CustomButton mt={4} lgWidth="30%" smWidth="100%" bgPrimary>
          Edit
        </CustomButton>
      </Link>
    </>
  );
  // return (
  //   <>
  //     <Swiper
  //       rewind={true}
  //       navigation={true}
  //       modules={[Navigation]}
  //       slidesPerView={1}
  //       spaceBetween={30}
  //       breakpoints={{
  //         640: {
  //           spaceBetween: 10,
  //           slidesPerView: 1,
  //         },
  //         768: {
  //           spaceBetween: 10,
  //           slidesPerView: 1,
  //         },
  //         1024: {
  //           spaceBetween: 30,
  //           slidesPerView: 1.5,
  //         },
  //       }}
  //       className="mySwiper"
  //     >
  //       {samplesData.map((slide: any) => (
  //         <SwiperSlide key={slide._id}>
  //           <Box
  //             sx={{
  //               position: `unset !important`,
  //               width: {
  //                 xs: `100%`,
  //                 sm: `100%`,
  //                 md: `50%`,
  //                 lg: `50%`,
  //                 xl: `50%`,
  //               },
  //               height: `200px`,
  //             }}
  //           >
  //             <Image
  //               src={slide?.image}
  //               alt="EventIcon"
  //               fill
  //               quality={100}
  //               style={{
  //                 objectFit: `contain`,
  //               }}
  //             />
  //             <div className="previousEventGradient">
  //               <Box
  //                 sx={{
  //                   width: `100%`,
  //                   display: `flex`,
  //                   alignItems: `end`,
  //                   justifyContent: `start`,
  //                 }}
  //               >
  //                 <Box p={3}>
  //                   <Typography
  //                     color="common.white"
  //                     fontSize={23}
  //                     fontWeight={500}
  //                   >
  //                     {slide.title}
  //                   </Typography>
  //                   <Typography color="grey.300" fontWeight={300}>
  //                     {slide.subTitle}
  //                   </Typography>
  //                 </Box>
  //               </Box>
  //             </div>
  //           </Box>
  //         </SwiperSlide>
  //       ))}
  //       <SwiperSlide>
  //         <Box
  //           sx={{
  //             position: `relative`,
  //             width: {
  //               xs: `100%`,
  //               sm: `100%`,
  //               md: `95%`,
  //               lg: `95%`,
  //               xl: `95%`,
  //             },
  //             height: `300px`,
  //             img: {
  //               width: `100%`,
  //               objectFit: `fill`,
  //             },
  //           }}
  //         >
  //           <Image src={sliderImg} alt="EventIcon" height={300} width={400} />
  //           <div className="previousEventGradient">
  //             <Box
  //               sx={{
  //                 width: `100%`,
  //                 display: `flex`,
  //                 alignItems: `end`,
  //                 justifyContent: `start`,
  //               }}
  //             >
  //               <Box p={3}>
  //                 <Typography
  //                   color="common.white"
  //                   fontSize={23}
  //                   fontWeight={500}
  //                 >
  //                   Udo & Uduak
  //                 </Typography>
  //                 <Typography color="grey.300" fontWeight={300}>
  //                   Wedding Service
  //                 </Typography>
  //               </Box>
  //             </Box>
  //           </div>
  //         </Box>
  //       </SwiperSlide>
  //       <SwiperSlide>
  //         <Box
  //           sx={{
  //             position: `relative`,
  //             width: {
  //               xs: `100%`,
  //               sm: `100%`,
  //               md: `95%`,
  //               lg: `95%`,
  //               xl: `95%`,
  //             },
  //             height: `300px`,
  //             img: {
  //               width: `100%`,
  //               objectFit: `fill`,
  //             },
  //           }}
  //         >
  //           <Image src={sliderImg} alt="EventIcon" height={300} width={400} />
  //           <div className="previousEventGradient">
  //             <Box
  //               sx={{
  //                 width: `100%`,
  //                 display: `flex`,
  //                 alignItems: `end`,
  //                 justifyContent: `start`,
  //               }}
  //             >
  //               <Box p={3}>
  //                 <Typography
  //                   color="common.white"
  //                   fontSize={23}
  //                   fontWeight={500}
  //                 >
  //                   Udo & Uduak
  //                 </Typography>
  //                 <Typography color="grey.300" fontWeight={300}>
  //                   Wedding Service
  //                 </Typography>
  //               </Box>
  //             </Box>
  //           </div>
  //         </Box>
  //       </SwiperSlide>
  //     </Swiper>
  //   </>
  // );
};

export default PreviousEventSlider;
