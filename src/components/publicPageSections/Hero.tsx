import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import UserRating from '../common/UserRating';
import Link from 'next/link';

const Hero = ({ queryData }: any) => {
  console.log(queryData);
  return (
    <Box mt={13}>
      <Box
        sx={{
          width: `100%`,
          height: {
            xs: `120px`,
            sm: `130px`,
            md: `200px`,
            lg: `200px`,
            xl: `300px`,
          },
          my: `1rem`,
          borderRadius: `10px`,
          position: `relative`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
          backgroundColor: `primary.main`,
        }}
      >
        <Box>
          <Image
            src={queryData?.company?.image}
            alt="bannerImage"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              height: `100%`,
              borderRadius: `10px`,
              objectFit: `cover`,
            }}
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: `70px`,
              sm: `70px`,
              md: `100px`,
              lg: `150px`,
              xl: `150px`,
            },
            height: {
              xs: `70px`,
              sm: `70px`,
              md: `100px`,
              lg: `150px`,
              xl: `150px`,
            },
            position: `absolute`,
            borderRadius: `50%`,
            bottom: {
              xs: `-2rem`,
              sm: `-2rem`,
              md: `-4rem`,
              lg: `-4rem`,
            },
            boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
            backgroundColor: `#fff`,
            border: `solid 4px #fff`,
          }}
        >
          <Box>
            <Image
              src={queryData?.picture}
              alt="bannerImage"
              fill
              style={{
                width: `100%`,
                borderRadius: `50%`,
                objectFit: `cover`,
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: {
            xs: `3rem`,
            sm: `3rem`,
            md: `5rem`,
            lg: `5rem`,
          },
        }}
      >
        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            position: `relative`,
          }}
        >
          <Typography
            fontWeight={600}
            sx={{
              fontSize: {
                xs: `1.2rem`,
                sm: `1.2rem`,
                md: `1.4rem`,
                lg: `1.5rem`,
              },
            }}
            textTransform="capitalize"
          >
            {queryData?.firstName} {` `} {queryData?.lastName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            my: `0.5rem`,
          }}
        >
          <UserRating rate={queryData?.rating} size="small" />
          <Typography ml={1} fontSize="0.9rem">{`(7 Events)`}</Typography>
        </Box>
        <Box
          sx={{
            textAlign: `center`,
            margin: `0 auto`,

            '.btn': {
              border: `none`,
              cursor: `pointer`,
              borderRadius: `8px`,
              boxShadow: `0px 4.82797px 6.0699px rgba(0, 0, 0, 0.1)`,
              margin: `1rem`,
              padding: `1rem 1.5rem`,
            },
            '.preview-btn': {
              color: `secondary.main`,
              fontWeight: `bold`,
              backgroundColor: `primary.main`,
              border: `solid 1px #1111`,
            },
          }}
        >
          <Link href="/login">
            <button className="preview-btn btn">Contact Me</button>
          </Link>
        </Box>
        <Box
          sx={{
            mt: `5rem`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
          }}
        >
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <Box>
              <Typography fontWeight={600}>Location:</Typography>
              <Typography>
                {queryData?.state} {queryData?.city}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight={600}>Member Since:</Typography>
            <Typography>Sep, 2022</Typography>
          </Box>
        </Box>
      </Box>
      {/* About Section */}
      <Box
        sx={{
          mt: `5rem`,
          mb: `3rem`,
          boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
          padding: `1.5rem`,
          borderRadius: `10px`,
        }}
      >
        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
          }}
        >
          <Typography
            fontWeight={600}
            sx={{
              fontSize: {
                xs: `1.2rem`,
                sm: `1.2rem`,
                md: `1.4rem`,
                lg: `1.5rem`,
              },
              mb: `1rem`,
            }}
          >
            About {queryData?.company?.name}
          </Typography>
        </Box>
        <Box>
          <Typography>{queryData?.company?.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
