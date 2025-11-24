// src/shared/apiClient.ts
import useAuthStore from "@/features/auth/stores/authStore";
import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            useAuthStore.getState().logout();
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);
