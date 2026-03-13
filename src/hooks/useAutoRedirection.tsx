import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useBusinessFormStore,
  useCHSFormStore,
  useSolarStore,
} from '@/lib/store';
import useCustomRouter from './useCustomRouter';

const useAutoRedirection = (initialSeconds = 10) => {
  const router = useCustomRouter();
  const queryClient = useQueryClient();
  const [counter, setCounter] = useState(initialSeconds);

  const resetAndGoHome = useCallback(() => {
    queryClient.clear();
    useSolarStore.getState().reset();
    useCHSFormStore.getState().reset();
    useBusinessFormStore.getState().reset();
    router.push('/step-one');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      resetAndGoHome();
      return;
    }

    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter, resetAndGoHome]);

  return { counter, resetAndGoHome, setCounter };
};

export default useAutoRedirection;
