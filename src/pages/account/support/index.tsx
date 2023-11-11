import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FeedbackForm from '@/components/FeedbackForm';
import {
  Box,
  Button,
  Tab,
  Tabs,
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
import theme from '@/styles/theme';
import TicketList, { TicketType } from '@/components/TicketList';
import SendMessage from '@/components/SendMessage';
import BasicAccordion from '@/components/BasicAccordian';

interface PropsTypes {
  token: string;
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
  `Search`,
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{
        border: `1px solid #BDC7C1`,
        overflowY: `auto`,
        marginTop: `20px`,
      }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
  textTransform: `none`,
  minWidth: 0,
  [theme.breakpoints.up(`sm`)]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  '&:hover': {
    opacity: 1,
  },
  '&.Mui-selected': {
    color: `#0DE75A`,
  },
  '&.Mui-focusVisible': {
    backgroundColor: `#d1eaff`,
  },
}));

const SupportPage = ({ token }: PropsTypes) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState(0);
  const { queryData, error, isLoading } = useFetch(
    `/profiles/${userInfo}`,
    token,
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <DashboardLayout token={token}>
      <Box
        sx={{
          paddingTop: 8,
        }}
      >
        <h1 className="ea-heading-1">Rate event Planner</h1>
        <Typography sx={{ mb: 5 }}>
          Welcome! Here you can work things out and resolves issues regarding
          your events
        </Typography>

        <div className="ea-line" />
        <Box
          sx={{
            display: `flex`,
            pt: 6,
            flexDirection: {
              xs: `column`,
              sm: `column`,
              md: `row`,
              lg: `row`,
              xl: `row`,
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: `100%`,
                sm: `100%`,
                md: `43%`,
                lg: `43%`,
                xl: `43%`,
              },
            }}
          >
            <h3 className="ea-heading-2">Search for a question</h3>
            <Typography sx={{ mb: 5 }}>Type your question or search</Typography>

            <Box>
              <Box
                sx={{
                  display: `flex`,
                  flexDirection: `row`,
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
                    color: `#0F3443`,
                    height: `100%`,
                    backgroundColor: `#71F79F`,
                  }}
                  variant="contained"
                  onClick={() => setValue(3)}
                  type="submit"
                >
                  SEARCH
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                <BasicAccordion
                  header="Payment"
                  content={[`Request Refund`, `Cancel Event`]}
                />
                <BasicAccordion
                  header="Inquiry"
                  content={[`About us`, `Services`]}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: {
                xs: `100%`,
                sm: `100%`,
                md: `57%`,
                lg: `57%`,
                xl: `57%`,
              },
            }}
          >
            <Box
              sx={{
                display: `flex`,
                justifyContent: `space-between`,
                flexDirection: `row`,
                pb: 2,
                borderBottom: `1px solid #BDC7C1`,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{
                  style: { display: `none` },
                }}
              >
                <StyledTab label="All Ticket" {...a11yProps(0)} />
                <StyledTab label="Active" {...a11yProps(1)} />
                <StyledTab label="Closed" {...a11yProps(2)} />
              </Tabs>
              <Button
                color="primary"
                style={{ color: theme.palette.secondary.main }}
                variant="contained"
                onClick={() => setValue(3)}
                type="submit"
              >
                Create Ticket
              </Button>
            </Box>
            <TabPanel value={value} index={0}>
              <TicketList type={TicketType.ALL} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TicketList type={TicketType.ACTIVE} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <TicketList type={TicketType.CLOSED} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <SendMessage userId="lol" token={token} />
            </TabPanel>
          </Box>
        </Box>
      </Box>
      <Box>
        <SendMessage userId="lol" token={token} />
      </Box>
    </DashboardLayout>
  );
};

export default SupportPage;
