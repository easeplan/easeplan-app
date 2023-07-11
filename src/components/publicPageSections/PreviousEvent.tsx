import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '@/styles/theme';

const PreviousEvent = ({ queryData }: any) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  function truncateString(str: string, num: any) {
    const newStr = str.toString();
    if (newStr.length > num) {
      return newStr.slice(0, num) + `.....`;
    } else {
      return newStr;
    }
  }
  return (
    <Box mt={10} mb={20}>
      <Typography
        fontWeight={600}
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
            md: `1fr 1fr`,
            lg: `1fr 1fr`,
          },
          gridTemplateAreas: `item2 item1`,
          alignItem: `center`,
          gap: `4rem`,
          mt: `3rem`,
        }}
      >
        {queryData.samples.map((data: any, i: any) => (
          <Box
            key={i}
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
                  md: `300px`,
                  lg: `400px`,
                  xl: `400px`,
                },
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.6)`,
                borderRadius: `10px`,
                position: `relative`,

                '.item2': {
                  gridArea: `item2`,
                },
              }}
            >
              <Image
                src={data?.sampleImage}
                alt="eventname"
                fill
                quality={100}
                style={{
                  borderRadius: `10px`,
                  objectFit: `cover`,
                }}
              />
            </Box>
            <Box
              sx={{
                width: `100%`,
                position: `absolute`,
                bottom: `-2rem`,
                zIndez: `1`,
                color: `#fff`,
              }}
            >
              <Box
                sx={{
                  width: `90%`,
                  margin: `0 auto`,
                  background: `rgba(0,0,0,0.7)`,
                  boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.6)`,
                  borderRadius: `10px`,
                  p: {
                    xs: `1rem`,
                    sm: `1rem`,
                    md: `1rem`,
                    lg: `1.5rem`,
                    xl: `1.5rem`,
                  },
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    fontSize: {
                      xs: `1rem`,
                      sm: `1rem`,
                      md: `1.5rem`,
                      lg: `1.5rem`,
                      xl: `1.5rem`,
                    },
                  }}
                >
                  {data?.title}
                </Typography>
                {showMore ? (
                  <Typography mt={2}>
                    {data?.description}
                    <span
                      style={{
                        cursor: `pointer`,
                        marginLeft: `0.4rem`,
                        fontWeight: `bold`,
                        color: theme.palette.secondary.main,
                      }}
                      onClick={() => setShowMore(false)}
                    >
                      Hide
                    </span>
                  </Typography>
                ) : (
                  <Typography mt={2}>
                    {truncateString(data?.description, 90)}
                    <span
                      style={{
                        cursor: `pointer`,
                        marginLeft: `0.4rem`,
                        fontWeight: `bold`,
                        color: theme.palette.secondary.main,
                      }}
                      onClick={() => setShowMore(true)}
                    >
                      Read more
                    </span>
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PreviousEvent;
