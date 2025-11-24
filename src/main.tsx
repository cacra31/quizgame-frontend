import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
