'use client';
import { IDLE_TIMEOUT } from '@/data/constants';
import useIdleTimeout from '@/hooks/useIdleTimeout';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactNode } from 'react';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <IdleTimerWrapper>{children}</IdleTimerWrapper>
    </PersistQueryClientProvider>
  );
};

const IdleTimerWrapper = ({ children }: { children: ReactNode }) => {
  useIdleTimeout(IDLE_TIMEOUT);

  return <>{children}</>;
};

export default ReactQueryProvider;
