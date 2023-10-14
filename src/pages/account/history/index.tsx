import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StyleIcon from '@mui/icons-material/Style';
import useFetch from '@/hooks/useFetch';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Box, Typography } from '@mui/material';
export { getServerSideProps } from '@/hooks/getServerSideProps';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ErrorPage from '@/components/ErrorPage';
import BasicTable from '@/components/Table';

const HistoryPage = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contracts, setContracts] = useState<any>();

  const fetchContracts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contracts/${userInfo}`,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        const json = await res.json();
        setContracts(json?.data);
        setIsLoading(false);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <DashboardLayout token={token}>
      <Box sx={{ width: `100%`, margin: `2rem auto` }}>
        <Typography
          sx={{
            fontSize: `1.5rem`,
            fontWeight: `700`,
            color: `primary.main`,
            mb: `1rem`,
          }}
        >
          Events
        </Typography>
        {/* <StyleIcon sx={{ fontSize: `4rem`, color: `grey.500` }} />
        <Typography color="grey.500">
          You don`t have any history at the moment
        </Typography> */}
        <BasicTable data={contracts} />
      </Box>
    </DashboardLayout>
  );
};

export default HistoryPage;
