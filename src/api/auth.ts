import type { LoginRequest } from "@/types/auth/LoginRequest";
import type { RegisterRequest } from "@/types/auth/RegisterRequest";
import { api } from "@/uitls/client";

export const loginApi = async ({
    userId,
    password
}: LoginRequest) => {
    const res = await api.post("/login", { userId, password });
    return res.data;
};

export const registerApi = async ({
    userId,
    password,
    name
}: RegisterRequest) => {
    const res = await api.post("/api/v1/user/register", { userId, password, name });
    return res.data;
};