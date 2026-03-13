'use client';
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useSolarStore,
  useCHSFormStore,
  useBusinessFormStore,
} from '@/lib/store';
import useCustomRouter from './useCustomRouter';

const useIdleTimeout = (timeout = 120000) => {
  const queryClient = useQueryClient();
  const solarStore = useSolarStore();
  const chsFormStore = useCHSFormStore();
  const businessFormStore = useBusinessFormStore();
  const router = useCustomRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      localStorage.clear();
      queryClient.clear();
      solarStore.reset();
      chsFormStore.reset();
      businessFormStore.reset();
      router.push('/step-one');
    }, timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout]);
};

export default useIdleTimeout;
