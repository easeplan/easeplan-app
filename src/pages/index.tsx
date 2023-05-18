import LoadingScreen from '@/components/common/LoadingScreen';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { queryData } = useSelector((store: any) => store.user);
  console.log(queryData);
  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default HomePage;
