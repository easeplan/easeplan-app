import DashboardLayout from '@/components/DashboardLayout';
import theme from '@/styles/theme';
import { Box, Typography } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CustomButton from '@/components/common/CustomButton';
import PlannerMessageForm from '@/components/PlannerMessageForm';
// import SearchVendor from '@/components/SearchVendor';
export { getServerSideProps } from '@/context/contextStore';

const OfferPage = ({ token }: any) => {
  return (
    <DashboardLayout token={token}>
      <Box
        p={3}
        mt={4}
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `column`,
            lg: `row`,
            xl: `row`,
          },
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Typography variant="h6" fontWeight={600} color="primary.main">
          Event #1345567
        </Typography>
        <Typography mt={1} variant="h6" fontWeight={600} color="primary.main">
          ₦1,001,030.00
        </Typography>
      </Box>

      <Box
        mt={3}
        // p={1}
        sx={{
          border: `solid 1px ${theme.palette.primary.main}`,
          display: `flex`,
          textAlign: `center`,
          justifyContent: {
            xs: `space-between`,
            sm: `space-between`,
          },
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `column`,
            lg: `column`,
            xl: `column`,
          },
        }}
      >
        <Box
          py={1}
          sx={{
            // border: `solid 1px ${theme.palette.primary.main}`,
            display: `grid`,
            gridTemplateColumns: {
              xs: `repeat(5, 1fr)`,
              sm: `repeat(5, 1fr)`,
              md: `repeat(5, 1fr)`,
              lg: `repeat(5, 1fr)`,
              xl: `repeat(5, 1fr)`,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
            fontWeight={500}
            color="primary.main"
          >
            Event type
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
            fontWeight={600}
            color="primary.main"
          >
            Event Date
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
            fontWeight={600}
            color="primary.main"
          >
            Event Venue
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
            fontWeight={600}
            color="primary.main"
          >
            Event City
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
            fontWeight={600}
            color="primary.main"
          >
            State
          </Typography>
        </Box>
        <Box
          py={1}
          sx={{
            borderTop: `solid 1px ${theme.palette.primary.main}`,
            display: `grid`,
            gridTemplateColumns: {
              xs: `repeat(5, 1fr)`,
              sm: `repeat(5, 1fr)`,
              md: `repeat(5, 1fr)`,
              lg: `repeat(5, 1fr)`,
              xl: `repeat(5, 1fr)`,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
          >
            Wedding
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
          >
            Feb/14/ 2024
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
          >
            No 4 abo road
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
          >
            Port Harcourt
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `0.7rem`,
                sm: `0.7rem`,
                md: `1rem`,
                lg: `1rem`,
                xl: `1rem`,
              },
            }}
          >
            Rivers State
          </Typography>
        </Box>
      </Box>

      <Box
        p={4}
        mt={4}
        sx={{
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
          }}
        >
          <Typography>Basic</Typography>
          <Typography>₦1,000,000.00</Typography>
        </Box>
        <Box
          mt={2}
          sx={{
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <CheckIcon style={{ color: theme.palette.secondary.main }} />
          <Typography ml={2} color="primary.main">
            Dj
          </Typography>
        </Box>
        <Box
          mt={2}
          sx={{
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <CheckIcon style={{ color: theme.palette.secondary.main }} />
          <Typography ml={2} color="primary.main">
            Caterer
          </Typography>
        </Box>
        <Box
          mt={2}
          sx={{
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <CheckIcon style={{ color: theme.palette.secondary.main }} />
          <Typography ml={2} color="primary.main">
            Decorators
          </Typography>
        </Box>
        <Box
          mt={2}
          sx={{
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <CheckIcon style={{ color: theme.palette.secondary.main }} />
          <Typography ml={2} color="primary.main">
            Hall
          </Typography>
        </Box>
      </Box>

      <Box
        p={4}
        mt={4}
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `column`,
            lg: `row`,
            xl: `row`,
          },
          border: `solid 1px ${theme.palette.primary.main}`,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600} color="primary.main">
            Are you available for this gig?
          </Typography>
          <Typography mt={1} color="primary.main">
            If you are please accept the event or decline if you are not
            available
          </Typography>
        </Box>
        <Box
          sx={{
            mt: {
              xs: `1rem`,
              sm: `1rem`,
              md: `1rem`,
              lg: `0rem`,
            },
          }}
        >
          <CustomButton
            sx={{
              px: 4,
            }}
            style={{
              background: `#fff`,
              border: `solid 1px ${theme.palette.primary.main}`,
              borderRadius: `0`,
              marginRight: `2rem`,
              height: `2.8rem`,
            }}
            bgPrimary
          >
            Decline
          </CustomButton>
          <CustomButton
            sx={{
              px: 4,
            }}
            bgPrimary
          >
            Accept
          </CustomButton>
        </Box>
      </Box>

      <Box
        p={4}
        mt={4}
        sx={{
          textAlign: `center`,
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="primary.main">
          Event Planning has started
        </Typography>
        <Typography mt={2} fontWeight={300} color="primary.main">
          The countdown is now ticking
        </Typography>
      </Box>

      <Box
        p={4}
        mt={4}
        sx={{
          display: `flex`,
          alignItems: `center`,
          gap: {
            sx: `1rem`,
            lg: `5rem`,
          },
          justifyContent: `space-between`,
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `column`,
            lg: `row`,
            xl: `row`,
          },
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Box
          sx={{
            width: {
              sx: `100%`,
              sm: `100%`,
              md: `100%`,
              lg: `80%`,
            },
          }}
        >
          <Typography color="primary.main">
            ₦1,000,000.00 payment has been made for this event, you are given
            %50 as well as vendors, this will be displayed in your available
            balance and that of vendors you have accepted to join you on this
            event. you will be permitted to withdraw %50 after the execution of
            of the event.
          </Typography>
          <Box
            mt={2}
            sx={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              flexDirection: {
                xs: `column`,
                sm: `column`,
                md: `column`,
                lg: `row`,
                xl: `row`,
              },
            }}
          >
            <Typography mt={1} fontWeight={600} color="primary.main">
              Current Balance: ₦1,000,000.00
            </Typography>
            <Typography mt={1} fontWeight={600} color="primary.main">
              %100
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              sx: `100%`,
              sm: `100%`,
              md: `100%`,
              lg: `20%`,
            },
          }}
        >
          <CustomButton mt={2} mdWidth="100%" lgWidth="100%" bgPrimary>
            Send
          </CustomButton>
        </Box>
      </Box>
      {/*
      <Box mt={4}>
        <SearchVendor />
      </Box> */}

      <Box
        p={4}
        mt={4}
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          flexDirection: {
            xs: `column`,
            sm: `column`,
            md: `column`,
            lg: `row`,
            xl: `row`,
          },
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600} color="common.white">
            Are you having challenge or need support?
          </Typography>
          <Typography mt={1} color="grey.300">
            Please click to visit the resolution center
          </Typography>
        </Box>
        <Box
          sx={{
            mt: {
              xs: `1rem`,
              sm: `1rem`,
              md: `1rem`,
              lg: `0rem`,
            },
          }}
        >
          <CustomButton
            sx={{
              px: 4,
            }}
            bgSecondary
          >
            Resolution Center
          </CustomButton>
        </Box>
      </Box>

      <Box mt={4}>
        <PlannerMessageForm />
      </Box>
    </DashboardLayout>
  );
};

export default OfferPage;
