import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import React from 'react';
import { handleErrorReponse, logger } from '../../../utils';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      onError: (err: any) => {
        const e = handleErrorReponse(err);
        const error = e;
        logger(error);
      },
    },
    queries: {
      retry: false,
    },
  },
});

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
