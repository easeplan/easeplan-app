import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const PreviousEvent = ({ queryData }: any) => {
  return (
    <>
      {queryData?.providerProfile?.samples.length > 0 ? (
        <Box mt={5} mb={20}>
          <Typography
            fontWeight={800}
            sx={{
              fontSize: {
                xs: `1.2rem`,
                sm: `1.2rem`,
                md: `1.5rem`,
                lg: `2rem`,
              },
            }}
            color="primary.main"
          >
            Previous Events
          </Typography>
          <Box
            sx={{
              display: `grid`,
              gridTemplateColumns: {
                xs: `1fr`,
                sm: `1fr`,
                md: `1fr 1fr 1fr`,
                lg: `1fr 1fr 1fr`,
              },
              gridTemplateAreas: `item2 item1`,
              alignItem: `center`,
              gap: `0.2rem`,
              mt: `3rem`,
            }}
          >
            {queryData?.providerProfile?.samples?.map((data: any) => (
              <Box
                key={data?._id}
                sx={{
                  borderRadius: `1px`,
                  height: `100%`,
                  position: `relative`,
                }}
              >
                <Box
                  sx={{
                    width: `100%`,
                    height: {
                      xs: `300px`,
                      sm: `300px`,
                      md: `350px`,
                      lg: `350px`,
                      xl: `350px`,
                    },
                    borderRadius: `10px`,
                    position: `relative`,
                    '.item2': {
                      gridArea: `item2`,
                    },
                  }}
                >
                  <Image
                    src={data?.sampleImage && data?.sampleImage}
                    alt="eventname"
                    fill
                    quality={100}
                    style={{
                      objectFit: `cover`,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default PreviousEvent;
