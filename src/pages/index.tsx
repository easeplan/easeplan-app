import { useEffect } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push('/user/findvendors');
    } else {
      router.push('/login');
    }
  }, [router, userInfo]);

  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default HomePage;
