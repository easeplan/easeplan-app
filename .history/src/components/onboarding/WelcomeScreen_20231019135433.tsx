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
        <ListItem key={index} style={{ paddingLeft: 50 }}>
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
    'the price for a service shall be as stated in the relevant service offering;',
    'the price for the service shall include applicable taxes and comply with applicable laws in force from time to time; and',
    'the service must be of satisfactory quality, fit for any purpose specified in, and conform in all material respects to the service offering and Your service profile.',
  ];

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} style={{ paddingLeft: 50 }}>
          <ListItemText
            primary={`(${String.fromCharCode(97 + index)}) ${item}`}
          />
        </ListItem>
      ))}
    </>
  );
}

function AlphabeticalList3() {
  const items = [
    'To  keep all personal information and data of the Service Seekers private and not - directly or indirectly - divulge, disclose, share or communicate any of such personal information and data to any third person or use such for personal gains, except as required in the course of performing the service in Your contract with the Service Seeker, or is so required by law to so disclose; and in any event that this happens, such personal information shall be divulged only with the prior notification and written consent of the Service Seeker.',
    'To have a physical meeting with the Service Seeker at the choice (yet safe) location of the Service Seeker where the Service Seeker opts to have any physical sight with You before the performance of the service.',
    'To not be emotional, insulting, verbally abusive, violent towards the Service Seekers.',
    'That You stand in a fiduciary relationship towards the Us at all times and shall observe utmost good faith in any engagement with the Service Seekers. That also understand that You are not in any partnership relationship with Us.',
    'To execute the services contracted for at all times within the agreed time and in such a manner as to preserve Our business and integrity.',
  ];

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} style={{ paddingLeft: 50 }}>
          <ListItemText
            primary={`(${String.fromCharCode(97 + index)}) ${item}`}
          />
        </ListItem>
      ))}
    </>
  );
}

function AlphabeticalList4() {
  const items = [
    'You shall execute all the services to exacting standard in accordance to demand, agreement and in accordance with Your service profile.',
    'You shall refund any and all sums received by You within 48 hours of such demand when Your service falls short of industry standards or the reasonable expectations of the Service Seeker.',
    'All the personal information You provided are true and accurate and shall notify Us within 24 hours in the event that any of such information is no longer accurate or entirely true.',
  ];

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} style={{ paddingLeft: 50 }}>
          <ListItemText
            primary={`(${String.fromCharCode(97 + index)}) ${item}`}
          />
        </ListItem>
      ))}
    </>
  );
}

function AlphabeticalList5() {
  const items = [
    'temporarily suspend Your access to our Platform;',
    'Permanently prohibit You from accessing our Platform;',
    'Block computers using Your IP address from accessing our Platform;',
    'Contact any or all of Your internet service providers and request that they block Your access to Our Platform;',
    'Suspend or delete Your account on Our Platform; and/or',
    'commence legal action against You, whether for breach of contract or otherwise.',
  ];

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} style={{ paddingLeft: 50 }}>
          <ListItemText
            primary={`(${String.fromCharCode(97 + index)}) ${item}`}
          />
        </ListItem>
      ))}
    </>
  );
}

function AlphabeticalList6() {
  const items = [
    'any costs, expenses and damages or fee paid to any third party/Service Seeker or government agency, to the sum equivalent to twice the fee expended or damage caused, as a result of Your breach of this Understanding.',
    'any third party/Service Seeker claim or action instituted against Us, to the sum equivalent to twice the grand total of the claim or legal action found liable in, as a result of your breach of any provision of this Understanding.',
    'any VAT liability or other tax liability that We may incur in relation to Your service offering through Our Platform where that liability arises out of Your inability to pay, withhold, or register to pay any VAT or other tax properly due in any territory or jurisdiction.',
  ];

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} style={{ paddingLeft: 50 }}>
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
                <Typography sx={{ fontSize: `bold`, mt: '1rem', mb: '1rem' }}>
                  Updated 1 August 2023.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="1. Introduction and Bindingness" />
                  </ListItem>
                  <List component="div" disablePadding>
                    <ListItem button style={{ paddingLeft: 32 }}>
                      <ListItemText primary="1.1. 'Easeplan' is the trading name for Easeplan Limited, a company registered under the laws of Nigeria with company registration number 7050033.  Under the aliases of “Our”, “Us”, or “We” in this Understanding, Easeplan operates a platform supported by logistics and payment systems that facilitate connections between event service seekers and event planners and vendors within Nigeria, primarily through the website easplan.io ('Platform')." />
                    </ListItem>
                    <ListItem button style={{ paddingLeft: 32 }}>
                      <ListItemText primary="1.2. This document, referred to as “Vendors’ Undertaking” or “Understanding”, applies to and is legally binding on individuals and entities engaged as Event Planners, Event Decorators, Photographers, Disk Jockeys, Caterers, Makeup Artists, Security Personnel, and other service providers that may subsequently be allowed to provide service through our Platform (collectively termed as “Vendors” or “You/Your”), who are registered on our Platform and shall govern the use of the Platform and Your relationship with Us and with the Service Seekers. Vendors can be individuals, a group of individuals, or incorporated entities recognized as legal persons." />
                    </ListItem>
                  </List>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <ListItem button style={{ paddingLeft: 32 }}>
                      <ListItemText primary="1.3. By using Our Platform, You acknowledge and agree to the following:" />
                    </ListItem>

                    <AlphabeticalList1 />
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={`2. Vendor’s Undertaking and Assurances`}
                        />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="2.1. You undertake that:" />
                      </ListItem>
                      <AlphabeticalList2 />
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="2.2. You further undertake:" />
                      </ListItem>
                      <AlphabeticalList3 />
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText primary="3. Warranty and Performance" />
                      </ListItem>

                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="3.1. You warranty the following:" />
                      </ListItem>
                      <AlphabeticalList4 />
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText primary={`4. Payment and Refunds`} />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="4.1. When You are engaged to provide a service by a Service Seeker, the Service Seeker will submit the service fee to You through Us and through Our Platform. We will then distribute 50% of the total amount (excluding Value Added Tax or “VAT”) to You. The remaining 50% will be disbursed to You once the Service Seeker is satisfied with Your services. These payments will be transferred to the bank account details You provided when creating Your account with us." />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="4.2. In the event that the service You provided falls short of industry standards or the reasonable expectations of the Service Seeker, and the Service Seeker decides to reject the service and request a refund, You are obligated not to withhold the refund. You agree to promptly refund the 50% You received within 48 hours of receiving such a request. This refund should be transferred to the bank account details We have provided to You." />
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText primary={`5.  Breach`} />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="5.1. Your account registered on Our Platform will remain valid and active subject to the provision of this clause." />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="5.2. Where We have reason to believe that You have breached any provision of this Understanding, We shall be entitled to do any or all of the following:" />
                      </ListItem>
                      <AlphabeticalList5 />
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="5.3.  Where We suspend, prohibit or block Your access to Our platform or a part of Our Platform, You are precluded from taking any action to circumvent such suspension or prohibition or blocking. Such actions include but are not limited to creating and/or using a different account on Our Platform." />
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText primary={`6. Liability and Indemnity `} />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="6.1.  In the event that You breach any provision or term outlined in this Understanding, You shall be held accountable to Us for a monetary amount deemed appropriate by Us, reflecting the extent of damage caused by the breach." />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="6.2.  Where You refuse or neglect to make a refund of the money received within 48 hours of such demand, You shall be liable to 10 times the refund sum demanded and a 24% interest on the compounded grand sum every seven days the compounded grand sum remains unpaid until the entire sum is fully paid." />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="6.3. If You fail to promptly refund the requested amount in clause 3(b) within 48 hours, You will be held liable for a sum equal to ten times the refund amount initially demanded, along with a 24% interest on the compounded total. This interest will accrue every seven days until the entire compounded sum is fully repaid." />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="6.4. You undertake to indemnify Us within 14 days of Your notice against:" />
                      </ListItem>
                      <AlphabeticalList6 />
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="6.5. Nothing in this Understanding shall limit any liabilities in any way that is not permitted under applicable law, or exclude any liabilities or statutory rights that may not be excluded under applicable law." />
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText primary={`7. Conflict in Terms`} />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="7.1. This Understanding shall compliment the Terms of Use and where any provision of this Understanding is in conflict with the Terms of Use, the provision of this Understanding shall prevail." />
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText primary={`8. Severability`} />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="In the event that any provision of this Understanding is held to be illegal, invalid or unenforceable by the ruling or judgment of a competent Court of Jurisdiction in Nigeria, such provision shall be deemed separate and divisible from this Understanding and shall not in any way affect the validity or enforceability of the remaining provisions of these terms." />
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText primary={`9. Variation`} />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="We may review and amend this Understanding from time to time. Such amendment shall apply and become effective from the date of publication on the Platform and not before." />
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={`10. Law and Dispute Resolution`}
                        />
                      </ListItem>
                      <ListItem button style={{ paddingLeft: 32 }}>
                        <ListItemText primary="These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria and any dispute, disagreement or conflict relating to this Understanding shall be subject to the exclusive jurisdiction of the courts of the territory." />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                style={{ marginRight: 10, cursor: 'pointer' }}
                onClick={handleExpandClick}
              >
                {expanded ? `Show Less` : 'Read More'}
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
