import { useState } from 'react';

const useSearchServices = (serviceType = '') => {
  const [service, setService] = useState(serviceType);

  const handleSetService = (data: string) => {
    setService(data);
  };
  const handleClearService = () => {
    setService('');
  };

  return { service, handleSetService, handleClearService };
};

export default useSearchServices;
