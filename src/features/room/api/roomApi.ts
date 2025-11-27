import { api } from "@/shared/api/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface RoomListResponse {
    roomId: string | null;
    categoryId: number;
    categoryName: string;
    currentPlayer: number | null;
    maxPlayer: number | null;
    createdAt: string | null;
}

export interface RoomRequest {
    roomId: number | null;
    categoryId: number | null;
}

export const useRoomListQuery = () => {
    return useQuery({
        queryKey: ["roomList"],
        queryFn: async () => {
            const res = await api.get<RoomListResponse[]>("/api/v1/room/list");
            return res.data;
        },
        staleTime: 1000,
    });
};

export const useRoomEnterMutation = () => {
    return useMutation({
        mutationFn: (categoryId: number) =>
            api.post<RoomRequest>("/api/v1/room/enter", { categoryId }),
    });
}

export const useRoomLeaveMutation = () => {
    return useMutation({
        mutationFn: () =>
            api.post<RoomRequest>("/api/v1/room/leave"),
    });
}