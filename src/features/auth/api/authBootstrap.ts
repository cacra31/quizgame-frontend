// features/auth/hooks/useAuthBootstrap.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore, { type User } from "../stores/authStore";
import { api } from "@/shared/api/apiClient";

type MeResponse = User; // { userId, name } 이런 형태라고 가정

export const useAuthBootstrap = () => {
  const login = useAuthStore((s) => s.login);
  const setInit = useAuthStore((s) => s.setInit);
  const init = useAuthStore((s) => s.init);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await api.get<MeResponse>("/auth/me");
      return res.data;
    },
    enabled: !init, // 이미 한 번 초기화했으면 다시 안 부름
    retry: false,
  });

  useEffect(() => {
    if (init) return;
    if (isLoading) return;

    if (data) {
      // 세션 유효 → 로그인 상태로 복원
      login(data);
    }
    // 세션이 없거나, 에러(401 등)여도 어쨌든 초기화는 끝
    setInit(true);
  }, [init, isLoading, data, login, setInit]);

  return { isLoading: !init || isLoading, isError };
};
