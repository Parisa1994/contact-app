'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(() => new QueryClient());
  const [ReactQueryDevtools, setReactQueryDevtools] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@tanstack/react-query-devtools').then(({ ReactQueryDevtools }) => {
        setReactQueryDevtools(() => ReactQueryDevtools);
      });
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
      {ReactQueryDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
