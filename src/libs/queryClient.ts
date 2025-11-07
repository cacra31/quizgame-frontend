import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분 동안은 fresh
      retry: 1,             // 실패 시 재시도 1번
      refetchOnWindowFocus: false,
    },
  },
});
