import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/authStore";
import { api } from "@/shared/api/apiClient";
import type { LoginRequest, LoginResponse, SignUpRequest } from "@/types/userType";

export const useLoginMutation = () => {
    const login = useAuthStore((s) => s.login);

    return useMutation({
        mutationFn: (data: LoginRequest) =>
            api.post<LoginResponse>("/auth/login", data),
        onSuccess: (res) => {
            login(res.data);
        },
    });
};

export const useLogoutMutation = () => {
    const logout = useAuthStore((s) => s.logout);
    return useMutation({
        mutationFn: () =>
            api.post<LoginResponse>("/auth/logout"),
        onSuccess: () => {
            logout();
        },
    });
}

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: (data: SignUpRequest) =>
            api.post<SignUpRequest>("/api/v1/user/signup", data),
    });
}