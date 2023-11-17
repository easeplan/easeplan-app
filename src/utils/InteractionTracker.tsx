import { useEffect } from 'react';
import { useSocket } from '@/hooks/useSocketContext';

export const useActivityTracker = (userId: string) => {
  const socket = useSocket();

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;

    const updateUserStatus = (userId: string) => {
      socket?.emit('changeActive', { userId: userId });
      // console.log('sent socket', userId);
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => updateUserStatus(userId as string), 2000); //60000
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);
};
