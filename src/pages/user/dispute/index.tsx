import React, { useEffect, useState } from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  TextareaAutosize,
  Typography,
  createSvgIcon,
  styled,
} from '@mui/material';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ErrorPage from '@/components/ErrorPage';
import TicketList, { TicketType } from '@/components/TicketList';
import SendMessage from '@/components/SendMessage';
import BasicAccordion from '@/components/BasicAccordian';
import Layout from '@/components/vendors/Layout';
import AcceptOfferConfirmModal from '@/components/AcceptOfferConfirmModal';
import CustomButton from '@/components/common/CustomButton';
import axios from 'axios';

interface PropsTypes {
  token: string;
  id: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const SearchIcon = createSvgIcon(
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
      fill="#0F3443"
    />
  </svg>,
  'Search',
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{
        border: '1px solid #BDC7C1',
        overflowY: 'auto',
        marginTop: '20px',
      }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  '&:hover': {
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#0DE75A',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const SupportPage = ({ token, id }: PropsTypes) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState(0);
  const [eventData, setEventData] = useState(
    ' am yet to add the reciever id here',
  );
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
    token,
  );

  useEffect(() => {
    localStorage.setItem('eventID', `${id}`);
    const data = localStorage.getItem('contract');

    // console.log(JSON.parse(data));
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [disputeValue, setDisputeValue] = useState('');
  const [disputeTypeValue, setDisputeTypeValue] = useState('');

  const handleDisputeChange = (event: any) => {
    setDisputeValue(event.target.value);
  };

  const handleDisputeTypeChange = (event: any) => {
    setDisputeTypeValue(event.target.value);
  };

  const disputes = [
    'Service not provided',
    'Service not as described',
    'Overcharging',
    'Late service delivery',
    'Cancellation without notice',
    'Property damage',
    'No show',
    'Unprofessional behavior',
    'Other',
  ];
  const disputeEvent = async () => {
    try {
      setIsLoadingData(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/disputes`,
        {
          description: disputeValue,
          disputeType: disputeTypeValue,
          //   providerId: eventData?.parties?.receiver?._id,
          //   contract: eventData?._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data?.status === 'success') {
        setEventData(data?.data);
        setIsLoadingData(false);
        // setConfirmCancel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <Layout data={queryData?.provider}>
      <Container sx={{ py: 4 }} maxWidth="lg">
        <Box
          sx={{
            paddingTop: 8,
          }}
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'primary.main',
              mb: '1',
            }}
          >
            Resolution center
          </Typography>
          <Typography sx={{ mb: 5 }}>
            Welcome! Here you can work things out and resolves issues regarding
            your events
          </Typography>

          <div className="ea-line" />
          <Box
            sx={{
              display: 'flex',
              pt: 6,
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: '30%',
                  lg: '30%',
                  xl: '30%',
                },
              }}
            >
              {/* <h3 className="ea-heading-2">Search for a question</h3>
            <Typography sx={{ mb: 5 }}>Type your question or search</Typography> */}

              <Box>
                {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div className="ea-form-control">
                  <div className="ea-input-icon">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    className="ea-input search"
                    placeholder="E.g Event planners"
                  />
                </div>
                <Button
                  color="primary"
                  style={{
                    color: '#0F3443',
                    height: '100%',
                    backgroundColor: '#71F79F',
                  }}
                  variant="contained"
                  onClick={() => setValue(3)}
                  type="submit"
                >
                  SEARCH
                </Button>
              </Box> */}

                <Box sx={{ my: 2 }}>
                  <BasicAccordion
                    header="Payment"
                    content={['Request Refund', 'Cancel Event']}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: '70%',
                  lg: '70%',
                  xl: '70%',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                    lg: 'row',
                    xl: 'row',
                  },
                  pb: 2,
                  borderBottom: '1px solid #BDC7C1',
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  TabIndicatorProps={{
                    style: { display: 'none' },
                  }}
                >
                  <StyledTab label="Messages" {...a11yProps(0)} />
                  <StyledTab label="All Ticket" {...a11yProps(1)} />
                  <StyledTab label="Active" {...a11yProps(2)} />
                  <StyledTab label="Closed" {...a11yProps(3)} />
                </Tabs>
                <Button
                  color="primary"
                  sx={{ color: 'secondary.main', px: 6 }}
                  variant="contained"
                  onClick={() => setValue(3)}
                  type="submit"
                >
                  Create Ticket
                </Button>
                {/* Dispute Modal */}
                {/* <AcceptOfferConfirmModal
                isOpen={confirmDispute}
                isClose={() => setConfirmDispute(false)}
                text="Dispute Resolution Form"
              >
                <Box
                  sx={{ p: 4, textAlign: 'center' }}
                  style={{ minHeight: '100%' }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="dispute-select-label">
                      Dispute Reason
                    </InputLabel>
                    <Select
                      labelId="dispute-select-label"
                      id="dispute-select"
                      value={disputeTypeValue}
                      label="Dispute Reason"
                      onChange={handleDisputeTypeChange}
                    >
                      {disputes.map((reason, index) => (
                        <MenuItem key={index} value={reason}>
                          {reason}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="We love to hear from you"
                    variant="outlined"
                    multiline
                    minRows={10}
                    sx={{
                      width: '100%',
                      mb: '2rem',
                      mt: '1rem',
                    }}
                    value={disputeValue}
                    onChange={handleDisputeChange}
                  />
                  <CustomButton
                    loading={isLoadingData}
                    onClick={disputeEvent}
                    bgPrimary
                  >
                    Submit Dispute
                  </CustomButton>
                </Box>
              </AcceptOfferConfirmModal> */}
              </Box>
              <TabPanel value={value} index={0}>
                <Box sx={{ p: 3 }}>
                  <Typography>Tell us more about this issue</Typography>
                </Box>
                <div className="ea-line" />
                <Box></Box>
                <Box>
                  <form>
                    <TextareaAutosize
                      style={{
                        width: '100%',
                        height: '16rem',
                        border: 'none',
                        padding: '1rem',
                      }}
                    />
                    <Box sx={{ p: 2, textAlign: 'right' }}>
                      <Button
                        variant="contained"
                        sx={{ px: 10, py: 1, color: 'secondary.main' }}
                      >
                        Send
                      </Button>
                    </Box>
                  </form>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TicketList type={TicketType.ALL} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TicketList type={TicketType.ACTIVE} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <TicketList type={TicketType.CLOSED} />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <h1>Hello World</h1>
              </TabPanel>
            </Box>
          </Box>
        </Box>
        {/* <Box>
        <SendMessage userId="lol" token={token} />
      </Box> */}
      </Container>
    </Layout>
  );
};

export default SupportPage;
