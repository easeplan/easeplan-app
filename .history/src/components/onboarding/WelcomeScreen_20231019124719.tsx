import {
  Box,
  Divider,
  Typography,
  Button,
  Modal,
  Collapse,
} from '@mui/material';
import logoImg from '@/public/logo.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { headTextAnimation, headContainerAnimation } from '@/lib/motion';
import IllusImg from '@/public/onboarding-image/welcome-img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIntro, setIntroOne } from '@/features/onboardingSlice';
import { RootState } from '@/store/store';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PortraitIcon from '@mui/icons-material/Portrait';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

function AlphabeticalList1() {
  const items = [
    'You affirm that you possess the requisite authority to consent to this Understanding.',
    'You confirm that you are at least 18 years old.',
    'You are bound (without qualification) and obligated to fully comply with all the terms contained in this Understanding until You voluntarily deactivate your account with Us or Your access to Our Platform is permanently revoked. It is important to note that any liabilities incurred prior to such deactivation or revocation will remain enforceable against You.',
    'You are solely responsible for any responses or communications originating from Your account with Us.',
    'You acknowledge that you will have access to certain personal information and data of the Service Seekers.',
    'In this Understanding “Service Seeker” in this Understanding refers to third parties who use Our Platform to contact You and formally engage Your services.',
  ];

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`(${String.fromCharCode(97 + index)}) ${item}`}
          />
        </ListItem>
      ))}
    </>
  );
}

function AlphabeticalList2() {
  const items = [
    'You affirm that you possess the requisite authority to consent to this Understanding.',
    'You confirm that you are at least 18 years old.',
    'You are bound (without qualification) and obligated to fully comply with all the terms contained in this Understanding until You voluntarily deactivate your account with Us or Your access to Our Platform is permanently revoked. It is important to note that any liabilities incurred prior to such deactivation or revocation will remain enforceable against You.',
    'You are solely responsible for any responses or communications originating from Your account with Us.',
    'You acknowledge that you will have access to certain personal information and data of the Service Seekers.',
    'In this Understanding “Service Seeker” in this Understanding refers to third parties who use Our Platform to contact You and formally engage Your services.',
  ];

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ml:}}>
          <ListItemText
            primary={`(${String.fromCharCode(97 + index)}) ${item}`}
          />
        </ListItem>
      ))}
    </>
  );
}
const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const { intro } = useSelector((state: RootState) => state.onboarding);
  const [open, setOpen] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNextSlide = () => {
    dispatch(setIntro(false));
    dispatch(setIntroOne(true));
  };

  return (
    <>
      {intro && (
        <Box
          sx={{
            display: `flex`,
            height: `100vh`,
            width: `100%`,
            backgroundColor: `primary.main`,
          }}
        >
          <Box
            sx={{
              width: `100%`,
              display: {
                xs: `flex`,
                sm: `flex`,
                md: `flex`,
                lg: `flex`,
                xl: `flex`,
              },
              alignItems: `center`,
              px: {
                xs: `2rem`,
                sm: `2rem`,
                md: `4rem`,
                lg: `6rem`,
              },
              justifyContent: `center`,
              backgroundColor: `secondary.light`,
            }}
            component={motion.section}
            {...headContainerAnimation}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary.main"
                sx={{
                  fontSize: {
                    xs: `1.1rem`,
                    md: `1.5rem`,
                    lg: `1.5rem`,
                  },
                  mb: 6,
                }}
              >
                Ready to start getting offers on Easeplan? <br /> Here`s the
                breakdown:
              </Typography>
              <Divider />
              <Box sx={{ display: `flex`, alignItems: `center`, my: 2 }}>
                <StorefrontIcon
                  sx={{
                    fontSize: {
                      xs: `2rem`,
                      md: `2rem`,
                      lg: `2.5rem`,
                    },
                    color: `primary.main`,
                  }}
                />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `1rem`,
                        md: `1.2rem`,
                        lg: `1.2rem`,
                      },
                    }}
                  >
                    Create your vendor profile
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `0.9rem`,
                        md: `1rem`,
                        lg: `1rem`,
                      },
                      mt: 1,
                    }}
                  >
                    Add your profile picture, description, and professional
                    information.
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: `flex`, alignItems: `center`, my: 2 }}>
                <PortraitIcon
                  sx={{
                    fontSize: {
                      xs: `2rem`,
                      md: `2rem`,
                      lg: `2.5rem`,
                    },
                    color: `primary.main`,
                  }}
                />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `1rem`,
                        md: `1.2rem`,
                        lg: `1.2rem`,
                      },
                    }}
                  >
                    Upload your previous jobs
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `0.9rem`,
                        md: `1rem`,
                        lg: `1rem`,
                      },
                      mt: 1,
                    }}
                  >
                    Add pictures of your previous jobs to convince clients / get
                    credits.
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: `flex`, alignItems: `center`, my: 2 }}>
                <LocalAtmIcon
                  sx={{
                    fontSize: {
                      xs: `2rem`,
                      md: `2rem`,
                      lg: `2.5rem`,
                    },
                    color: `primary.main`,
                  }}
                />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `1rem`,
                        md: `1.2rem`,
                        lg: `1.2rem`,
                      },
                    }}
                  >
                    Publish your profile and start making money.
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{
                      fontSize: {
                        xs: `0.9rem`,
                        md: `1rem`,
                        lg: `1rem`,
                      },
                      mt: 1,
                    }}
                  >
                    Complete your profile information to be able to
                    withdraw your earnings.
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ textAlign: `center` }}>
                <Button
                  onClick={handleNextSlide}
                  sx={{
                    mt: `2rem`,
                    backgroundColor: `primary.main`,
                    color: `white`,
                    '&:hover': {
                      backgroundColor: `secondary.main`,
                      color: `primary.main`,
                    },
                    borderRadius: `30px`,
                    p: `0.7rem 4rem`,
                    fontWeight: 700,
                    fontSize: `1rem`,
                    textTransform: `inherit`,
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
            {/* <Typography variant="h5" fontWeight={600} color="primary.main">
              <FaQuoteLeft />
              You are just a few clicks away from connecting with a wide range
              of customers and clients in need of your services.
            </Typography> */}
          </Box>
          <Box
            sx={{
              display: {
                xs: `none`,
                sm: `none`,
                md: `none`,
                lg: `flex`,
                xl: `flex`,
              },
              alignItems: `center`,
              p: `2rem`,
              backgroundColor: `primary.main`,
              width: `50%`,
              height: `100%`,
            }}
          >
            <Box
              sx={{
                width: `100%`,
              }}
            >
              <Box
                component={motion.div}
                {...headTextAnimation}
                sx={{
                  position: `relative`,
                  textAlign: `center`,
                  mt: `2rem`,
                }}
              >
                <Image src={logoImg} alt="logoImage" height={35} width={180} />
              </Box>
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `300px`,
                  mt: `2rem`,
                }}
              >
                <Image src={IllusImg} alt="logoImage" fill />
              </Box>
              {/* <Box
                sx={{
                  mt: {
                    xs: `3rem`,
                    sm: `1rem`,
                    lg: `6rem`,
                  },
                  px: `2rem`,
                  textAlign: `center`,
                }}
              >
                <CustomButton
                  bgSecondary
                  smWidth="100%"
                  lgWidth="50%"
                  onClick={handleNextSlide}
                >
                  Get Started
                </CustomButton>
              </Box> */}
            </Box>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 10,
                width: 700,
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <Typography variant="h6" style={{ marginBottom: 20 }}>
                VENDORS’ UNDERSTANDING
              </Typography>
              <Typography variant="body2" style={{ marginBottom: 20 }}>
                <Typography sx={{ fontSize: 'bold', mt: '1rem', mb: '1rem' }}>
                  Updated 1 August 2023.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="1. Introduction and Bindingness" />
                  </ListItem>
                  <List component="div" disablePadding>
                    <ListItem button style={{ paddingLeft: 32 }}>
                      <ListItemText primary="1.1 'Easeplan' is the trading name for Easeplan Limited, a company registered under the laws of Nigeria with company registration number 7050033.  Under the aliases of “Our”, “Us”, or “We” in this Understanding, Easeplan operates a platform supported by logistics and payment systems that facilitate connections between event service seekers and event planners and vendors within Nigeria, primarily through the website easplan.io ('Platform')." />
                    </ListItem>
                    <ListItem button style={{ paddingLeft: 32 }}>
                      <ListItemText primary="1.2 This document, referred to as “Vendors’ Undertaking” or “Understanding”, applies to and is legally binding on individuals and entities engaged as Event Planners, Event Decorators, Photographers, Disk Jockeys, Caterers, Makeup Artists, Security Personnel, and other service providers that may subsequently be allowed to provide service through our Platform (collectively termed as “Vendors” or “You/Your”), who are registered on our Platform and shall govern the use of the Platform and Your relationship with Us and with the Service Seekers. Vendors can be individuals, a group of individuals, or incorporated entities recognized as legal persons." />
                    </ListItem>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {/* Add more ListItems here for the additional sections */}
                        <ListItem button style={{ paddingLeft: 32 }}>
                          <ListItemText primary="1.3 By using Our Platform, You acknowledge and agree to the following:" />
                        </ListItem>

                        <AlphabeticalList1 />

                        <ListItem button style={{ paddingLeft: 32 }}>
                          <ListItemText primary="1.3 Additional agreement part..." />
                        </ListItem>
                        <ListItem button style={{ paddingLeft: 32 }}>
                          <ListItemText primary="1.3 Additional agreement part..." />
                        </ListItem>
                        <ListItem button style={{ paddingLeft: 32 }}>
                          <ListItemText primary="1.3 Additional agreement part..." />
                        </ListItem>
                        {/* ... */}
                      </List>
                    </Collapse>
                  </List>
                </List>
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                style={{ marginRight: 10, cursor: 'pointer' }}
                onClick={handleExpandClick}
              >
                Learn more
              </Typography>
              <Box style={{ marginTop: '2rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  style={{ marginRight: '1rem' }}
                >
                  Agree and Continue
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                >
                  Decline
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default WelcomeScreen;
