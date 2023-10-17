import { useState } from 'react';

const useSearchServices = (serviceType = ``) => {
  const [service, setService] = useState(serviceType);

  const handleSetService = (data: string) => {
    setService(data);
  };

  return { service, handleSetService };
};

export default useSearchServices;
